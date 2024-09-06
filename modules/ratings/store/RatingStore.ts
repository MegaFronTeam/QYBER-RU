import fetcher from '../services/fetcher';

export const UseRatingStore = defineStore({
  id: 'Rating',
  state: () => ({
    data: [],
    loading: false,
    pages: {
      total: 0,
      totalPages: 0,
      current: 1,
      per_page: 100,
    },
  }),
  actions: {
    async fetchRatings(params: string = '') {
      this.loading = true;
      try {
        const setPer_page = this.pages.per_page != 10 ? `per_page=${this.pages.per_page}` : '';
        const setPage = `${params ? '&' : '?'}${'page=' + this.pages.current}${
          this.pages.per_page != 10 ? '&' : ''
        }${setPer_page}`;
        const ratings = await fetcher(`/wp/v2/teams${params}${setPage}&sort=rating`);
        console.log(ratings);

        this.data = ratings.data;
        this.pages.total = ratings.headers['x-wp-total'];
        this.pages.totalPages = ratings.headers['x-wp-totalpages'];
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    setPageCurrent(page: number) {
      this.pages.current = page;
    },
  },
});
