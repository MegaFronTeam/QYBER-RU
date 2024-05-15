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
    const API_KEY = localStorage.getItem('token');
    // const email = localStorage.getItem('email');
    const email = 'janis.paberzs18@gmail.com';

    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${API_KEY}`),
        },
        // email: email, // Remove the extra curly braces here
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default new Auth();
