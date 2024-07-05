import FilterServices from '~/services/FilterServises';

export const useFilterStore = defineStore({
  id: 'filterStore',
  state: () => ({
    leagues: [],
    discipline: [],
  }),
  actions: {
    async fetchLeagues() {
      try {
        const leagues = await FilterServices.fetchLeagues();
        this.leagues = leagues;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDiscipline() {
      try {
        const disciplines = await FilterServices.fetchDiscipline();
        this.discipline = disciplines;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
