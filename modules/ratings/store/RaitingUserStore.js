import { defineStore } from 'pinia';
import fetcher from '../services/fetcher';

export const useRaitingUserStore = defineStore('raitingUserStore', {
  state: () => ({
    data: [],
    error: '',
  }),
  getters: {
    getRegisteredDate: (state) => {
      return formatDate(state.data.user_registered, 'dd.MM.yyyy');
    },
  },
  actions: {
    async fetchUser(url) {
      await fetcher(url).then((response) => {
        if (response.status === 200) return (this.data = response.data);
        this.error = response.data.message;
      });
    },
  },
});
