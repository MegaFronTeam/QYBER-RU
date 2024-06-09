import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSponsorsStore = defineStore('sponsorsStore', () => {
  const sponsorsPage = ref({});
  const sponsors = ref([]);
  const ids = ref(0);

  const getSponsors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/sponsors`);
      sponsors.value = response.data;

      return response.data;
    } catch (error) {
      console.log(error);
    }
    // console.log(sponsors.value);
  };

  const getSponsorsPage = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sponsors/v1/index`);

      // console.log(response.data);
      sponsorsPage.value = response.data;

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sponsors,
    sponsorsPage,
    getSponsors,
    getSponsorsPage,
    ids,
  };
});
