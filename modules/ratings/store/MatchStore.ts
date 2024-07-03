// import { defineStore } from 'pinia'
import { useGlobalStore } from '~/store/globalStore';
import fetchData from '../services/matchService';
import { useTournamentPageStore } from './TournamentPageStore';
import type { MatchInterface } from '@/modules/tournaments/interfaces/interface';

export const useMyMatchStore = defineStore('matchStore', {
  state: () => ({
    dataMatch: {} as MatchInterface,
  }),
  getters: {
    broadcastIframe(): string {
      return this.dataMatch?.broadcast.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1' || '';
    },
    isPlayerInMatch(state): boolean {
      const globalStore = useGlobalStore();

      if (state.dataMatch.a.members.find((member) => member.id === globalStore.userData.ID))
        return true;
      if (state.dataMatch.b.members.find((member) => member.id === globalStore.userData.ID))
        return true;

      return false;
    },
  },
  actions: {
    async fetchData(id: string): Promise<void> {
      const response: MatchInterface = await fetchData(id);

      this.dataMatch = response;

      this.dataMatch.date = formatDate(response.date);
      // console.log(this.dataMatch);
    },
  },
});
