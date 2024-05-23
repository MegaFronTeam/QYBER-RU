import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSponsorsStore = defineStore('sponsorsStore', () => {
  const sponsors = ref([]);

  const getSponsors = async () => {
    const response = await axios.get(`${BASE_URL}/wp/v2/sponsors`);
    sponsors.value = response.data;
    console.log(sponsors.value);
  };

  return {
    sponsors,
    getSponsors,
  };
});
