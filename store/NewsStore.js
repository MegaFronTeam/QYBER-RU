import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    data: [],
    dataLast: [],
  }),
  actions: {
    async fetchNews(page) {
      try {
        const response = await axios.get(
          `${BASE_URL}/wp/v2/posts${page ? `?per_page=${page}` : ''}`,
        );
        const data = await response.data.map((item) => {
          item.date = format(new Date(item.date), 'HH:mm, d MMMM yyyy', {
            locale: ru,
          });
          return item;
        });
        this.data = data;
        this.dataLast = data.slice(0, 3);
        this.dataLast = this.dataLast;
      } catch (error) {
        console.error(error);
      }
    },
    async getLast() {
      this.dataLast = this.data.slice(0, 3);
    },
  },
});
