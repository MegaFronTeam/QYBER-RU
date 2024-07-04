import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import GlobalServices from './globalServices';

export default class NewsServices {
  static fetchNewsById = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  static fetchNews = async (params: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/posts${params}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
}
