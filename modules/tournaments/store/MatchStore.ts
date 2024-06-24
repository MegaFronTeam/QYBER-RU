// import { defineStore } from 'pinia'
import fetchData from '../services/matchService';
import { useTournamentPageStore } from './TournamentPageStore';
import type { MatchInterface } from '@/modules/tournaments/interfaces/interface';

export const useMyMatchStore = defineStore('matchStore', {
  state: () => ({
    dataMatch: {} as MatchInterface,
  }),
  getters: {
    broadcastIframe(): string {
      if (!this.dataMatch.broadcast) return '';
      return this.dataMatch.broadcast.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1';
    },
  },
  actions: {
    async fetchData(id: string): Promise<void> {
      const response: MatchInterface = await fetchData(id);

      this.dataMatch = response;

      this.dataMatch.date = formatDate(response.date);
    },
  },
});
