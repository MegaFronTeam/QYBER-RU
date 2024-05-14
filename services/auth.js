import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const { $locally } = useNuxtApp();

class Auth {
  async login(email, password, redirect = '/') {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/v1/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async singUp(email, password) {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/v1/signup`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async myProfile() {
    const API_KEY = localStorage.getItem('API_KEY');
    const email = localStorage.getItem('email');
    try {
      const response = await axios.get(`${BASE_URL}/auth/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`email:${API_KEY}`),
        },
        email: email, // Remove the extra curly braces here
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default new Auth();