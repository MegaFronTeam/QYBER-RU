import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import GlobalServices from '@/services/globalServices';

export default class MatchService {
  static async updateMatch(id: string, data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/tournaments/v1/update-match/${id}`, data, {
        headers: GlobalServices.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}
