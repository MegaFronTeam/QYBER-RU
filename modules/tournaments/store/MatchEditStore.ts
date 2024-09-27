import { tr } from 'date-fns/locale';
import type { MatchInterface } from '../interfaces/interface';
import MatchService from '../services/matchEditService';

import { useTournamentPageStore } from './TournamentPageStore';

import { formatDate } from '@/utils/formatData';
import { useToast } from 'primevue/usetoast';

export const useMatchEditStore = defineStore('MatchEdit', {
  state: () => ({
    editMatch: {} as MatchInterface,
    toast: useToast(),
  }),
  getters: {
    // MatchDate(): string {
    //   return this.editMatch.date;
    // }

    getMatchDate: (state) => {
      if (!state.editMatch.date) return '';
      console.log(state.editMatch.date.length);

      const date =
        state.editMatch.date.length > 2 && state.editMatch.date.length < 30
          ? state.editMatch.date
          : formatDate(state.editMatch.date, 'y-MM-dd HH:mm');
      // const time =
      //   state.editMatch.time && state.editMatch.time.length < 6
      //     ? `${state.editMatch.time}:00`
      //     : formatDate(state.editMatch.time, 'HH:mm:ss');
      return `${date}`;
      // return `${date} ${time}`;
    },

    getStatus: (state) => {
      return state.editMatch.checked ? 'play' : 'pending';
    },
    isFinished: (state) => {
      if (state.editMatch.status) return state.editMatch.status.value === 'done';
    },
  },
  actions: {
    showToast(
      severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined,
      summary: string,
      detail: string,
    ) {
      this.toast.add({
        severity,
        summary,
        detail,
        life: 10000,
      });
    },
    setModalData(item: MatchInterface) {
      this.editMatch = {
        ...item,
        checked: item.status.value === 'play',
      };
      // console.log(new Date(this.editMatch.date));

      // this.editMatch.oldDate = this.editMatch.date;
      // this.editMatch.date = formatDate(item.date, 'dd.MM.yyyy HH:mm');
    },

    async updateMatch(finish: boolean, team?: 'a' | 'b') {
      const tournamentStore = useTournamentPageStore();
      if (
        this.editMatch.a.disqualification === true ||
        this.editMatch.b.disqualification === true
      ) {
        const winnerTeam = this.editMatch.a.disqualification === true ? 'b' : 'a';
        const looserTeam = this.editMatch.a.disqualification === true ? 'a' : 'b';
        this.editMatch[looserTeam].counter = 0;
        this.editMatch[winnerTeam].counter =
          +this.editMatch[winnerTeam].counter === 0 ? 1 : +this.editMatch[winnerTeam].counter;
      }
      const dataForm = {
        counter_a: +this.editMatch.a.counter,
        counter_b: +this.editMatch.b.counter,
        server: this.editMatch.server,
        discord: this.editMatch.discord,
        broadcast: this.editMatch.broadcast,
        show_in_main: this.editMatch.show_in_main,
        date: this.getMatchDate,
        status: this.getStatus,
        disqualification_a: this.editMatch.a.disqualification,
        disqualification_b: this.editMatch.b.disqualification,
      };

      if (this.editMatch.b.command === false) {
        dataForm.disqualification_b = true;
      }
      if (finish === true) {
        dataForm.status = 'done';
        this.editMatch.status = { value: 'done', label: 'Завершен' };
      }
      console.log(dataForm.status);

      try {
        const response = await MatchService.updateMatch(this.editMatch.id, dataForm);
        console.log(response);
        if (response.status === true) {
          console.log(response);
          if (dataForm.status === 'done') {
            this.editMatch.checked = false;
            this.showToast('success', 'Матч', ' успешно завершен');
          } else {
            this.showToast('success', 'Матч', ' успешно обновлен');
          }
          tournamentStore.fetchData(tournamentStore.currentID);
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
