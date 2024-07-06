import fetcher from '../services/fetcher';

export const UseRatingStore = defineStore({
  id: 'Rating',
  state: () => ({
    data: [],
    loading: false,
  }),
  actions: {
    async fetchRatings(params: string = '') {
      this.loading = true;
      try {
        const ratings = await fetcher(`/wp/v2/teams${params}`);
        this.data = ratings.data;
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
  },
});
