import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default class FilterServices {
  static fetchLeagues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/leagues`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  static fetchDiscipline = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/discipline`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
}
