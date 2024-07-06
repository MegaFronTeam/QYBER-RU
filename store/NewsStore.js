import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import NewsServices from '@/services/NewsServices';

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    data: [],
    dataById: {},
  }),
  getters: {
    dataLast: (state) => state.data.slice(0, 3) || [],
  },
  actions: {
    async fetchNews(params = '') {
      this.data = [];
      this.data = await NewsServices.fetchNews(params);
      this.data = this.data.map((item) => {
        item.date = format(new Date(item.date), 'HH:mm, d MMMM yyyy', {
          locale: ru,
        });
        return item;
      });
    },
    async fetchNewsById(id) {
      this.dataById = await NewsServices.fetchNewsById(id);

      const date = new Date(this.dataById.date);
      this.dataById.formattedDate = format(date, 'd MMMM yyyy, HH:mm', {
        locale: ru,
      });

      // const leagues =
      //   this.dataById.leagues.length > 0 ? `&leagues=${this.dataById.leagues[0]}` : '';
      // const discipline =
      //   this.dataById.discipline.length > 0 ? `&discipline=${this.dataById.discipline[0]}` : '';
      await this.fetchNews(`?exclude=${id}&per_page=4`);
      // leagues=${leagues}&discipline=${discipline}&
    },
  },
});
