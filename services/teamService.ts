import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import GlobalServices from './globalServices';

export default class teamService {
  static getPotentialMembers = async (teamId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/v1/potential/${teamId}`, {
        headers: GlobalServices.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
}
