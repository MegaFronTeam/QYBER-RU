import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

class Team {
  get localData() {
    return {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('user_email'),
    };
  }
  // async getMyTeams() {
  //   const { token, email } = this.localData;

  //   try {
  //     const response = await axios.get(`${BASE_URL}/teams/v1/my`, {
  //       headers: {
  //         Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async getTeam(id) {
  //   const { token, email } = this.localData;

  //   try {
  //     const response = await axios.get(`${BASE_URL}/teams/v1/team/${id}`, {
  //       headers: {
  //         Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async getLeagues() {
  //   const { token, email } = this.localData;
  //   try {
  //     const response = await axios.get(`${BASE_URL}/wp/v2/leagues`, {
  //       headers: {
  //         Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async getDisciplines() {
  //   const { token, email } = this.localData;
  //   try {
  //     const response = await axios.get(`${BASE_URL}/wp/v2/discipline`, {
  //       headers: {
  //         Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async createTeam(data) {
  //   const { token, email } = this.localData;

  //   try {
  //     const response = await axios.post(`${BASE_URL}/teams/v1/create`, data, {
  //       headers: {
  //         Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }

  // async deleteTeamMember(TEAM_ID, USER_ID) {
  //   const { token, email } = this.localData;
  //   console.log(TEAM_ID, USER_ID);
  //   try {
  //     const response = await axios.delete(
  //       `${BASE_URL}/teams/v1/team/${TEAM_ID}/member/${USER_ID}`,
  //       {
  //         headers: {
  //           Authorization: 'Basic ' + btoa(`${email}:${token}`),
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(error);
  //   }
  // }
}

export default new Team();
