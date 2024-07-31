import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const useAboutStore = defineStore('aboutStore', {
  state: () => ({
    data: {},
    views: 0,
  }),
  actions: {
    async fetchData() {
      const { data } = await axios.get(`${BASE_URL}/about/v1/stats`);
      await axios
        .get(`${BASE_URL}/wp/v2/pages`)
        .then((response) => (this.views = response.data[4].services.views))
        .catch((error) => console.error('About page Error:', error));
      this.data = data;
      this.data.total_sum = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
        .format(+this.data.total_sum)
        .replace(/\.00$/, '');
    },
  },
});
