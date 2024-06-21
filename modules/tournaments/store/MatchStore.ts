// import { defineStore } from 'pinia'
import fetchData from '../services/matchService';
import { useTournamentPageStore } from './TournamentPageStore';
import type { MatchInterface } from '@/modules/tournaments/interfaces/interface';

export const useMyMatchStore = defineStore('matchStore', {
  state: () => ({
    dataMatch: {} as MatchInterface,
  }),
  actions: {
    async fetchData(id: string): Promise<void> {
      const response = await fetchData(id);
      this.dataMatch = response;
    },
  },
});
