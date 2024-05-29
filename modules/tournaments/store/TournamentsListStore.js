import { defineStore } from 'pinia';
import { useTournamentPageStore } from './TournamentPageStore';

export const useTournamentsListStore = defineStore('tournamentsList', () => {
  const TournamentPageStore = useTournamentPageStore();
  const matches = ref([]);

  console.log(matches.value);
  return {
    matches,
  };
});
