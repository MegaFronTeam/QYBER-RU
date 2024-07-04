import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import GlobalServices from './globalServices';

export default class UserServices {
  static acceptInvite = async (inviteId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams/v1/access-invite/${inviteId}`, null, {
        headers: GlobalServices.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  static declineInvite = async (inviteId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams/v1/denied-invite/${inviteId}`, null, {
        headers: GlobalServices.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  static fetchNewsById = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  static fetchNews = async (page: number, filters: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wp/v2/posts?page=${page}${filters ? `${filters}` : ''}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
}
