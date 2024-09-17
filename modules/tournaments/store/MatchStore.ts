// import { defineStore } from 'pinia'
import { useGlobalStore } from '~/store/globalStore';
import fetchData from '../services/matchService';
import { useTournamentPageStore } from './TournamentPageStore';

import broadCast from '@/services/broadCastServise';
import type { MatchInterface } from '@/modules/tournaments/interfaces/interface';

export const useMyMatchStore = defineStore('matchStore', {
  state: () => ({
    dataMatch: {} as MatchInterface,
  }),
  getters: {
    broadcastIframe(): string {
      const broadcast = this.dataMatch?.broadcast;
      return broadCast(broadcast) || '';
    },
    isPlayerInMatch(state): boolean {
      const globalStore = useGlobalStore();

      if (
        state.dataMatch.a.command &&
        state.dataMatch.a.members.find((member) => member.id === globalStore.userData.ID)
      )
        return true;
      if (
        state.dataMatch.b.command &&
        state.dataMatch.b.members.find((member) => member.id === globalStore.userData.ID)
      )
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
