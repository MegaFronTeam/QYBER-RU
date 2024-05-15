import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getMyTeams() {
  const API_KEY = localStorage.getItem('token');
  const email = localStorage.getItem('user_email');

  try {
    const response = await axios.get(`${BASE_URL}/teams/v1/my`, {
      headers: {
        Authorization: 'Basic ' + btoa(`${email}:${API_KEY}`),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

async function getTeam(id) {
  const API_KEY = localStorage.getItem('token');
  const email = localStorage.getItem('user_email');

  try {
    const response = await axios.get(`${BASE_URL}/teams/v1/team/${id}`, {
      headers: {
        Authorization: 'Basic ' + btoa(`${email}:${API_KEY}`),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export { getMyTeams, getTeam };
