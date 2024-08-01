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
      if (!state.editMatch.date || !state.editMatch.time) return '';
      console.log(state.editMatch);

      const date =
        state.editMatch.date && state.editMatch.date.length < 11
          ? state.editMatch.date.split('.').reverse().join('-')
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
      return state.editMatch.status?.valueOf() === 'done';
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
        checked: item.status?.valueOf() === 'play',
      };
      this.editMatch.oldDate =
        formatDate(this.editMatch.date, 'dd.MM.yyyy') + formatDate(this.editMatch.time, 'HH:mm');
      this.editMatch.date = formatDate(item.date, 'dd.MM.yyyy HH:mm');
      this.editMatch.time = formatDate(item.date, 'HH:mm');
    },

    async updateMatch(finish: boolean, team: 'a' | 'b') {
      const tournamentStore = useTournamentPageStore();
      if (team) {
        const winnerTeam = team === 'a' ? 'b' : 'a';
        this.editMatch[team].counter = 0;
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
      };
      if (finish === true) {
        dataForm.status = 'done';
      }

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
