import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import GlobalServices from '@/services/globalServices';

export default async function fetchData(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/wp/v2/matches/${id}`, {
      headers: GlobalServices.getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
