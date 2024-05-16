import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const { $locally } = useNuxtApp();

class Auth {
  get localData() {
    return {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('user_email'),
    };
  }
  checkAuth() {
    if (this.localData.every((item) => item !== null)) {
      return true;
    } else {
      return false;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/v1/login`,
        {
          email,
          password,
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
          email,
          password,
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

  async getMyProfileData() {
    const { token, email } = this.localData;
    console.log(email);
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${token}`),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async updateMyProfileData(data) {
    const { token, email } = this.localData;
    console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/update`, data, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${token}`),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async updatePassword(data) {
    const { token, email } = this.localData;
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/update-password`, data, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${token}`),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async setUserVerification(data) {
    const { token, email } = this.localData;

    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, data, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email}:${token}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default new Auth();
