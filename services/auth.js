import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

class Auth {
  async login(email, password, redirect = '/') {
    try {
      const response = await axios.post(`${BASE_URL}/auth/v1/login`, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async singUp(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/v1/signup`, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default new Auth();