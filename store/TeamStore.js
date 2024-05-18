import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const EMAIL = import.meta.env.VITE_EMAIL;

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    loader: true,
    isCaptain: false,
    myTeams: [],
    teamData: [],
  }),
  actions: {
    async fetcher(method, url) {
      return await axios(`${BASE_URL}${url}`, {
        method: method,
        headers: {
          Authorization: 'Basic ' + btoa(`${EMAIL}:${API_KEY}`),
        },
      });
    },
    async fetchMyTeams() {
      try {
        const res = await this.fetcher('GET', '/teams/v1/my');
        const data = res.data;

        this.myTeams = data;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTeam(id) {
      try {
        const res = await this.fetcher('GET', `/teams/v1/team/${id}`);
        const data = res.data;

        this.teamData = data;

        this.teamData.members.forEach((member) =>
          +member.id === +'18' ? (this.isCaptain = true) : (this.isCaptain = false),
        );

        this.loader = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTeamMember(USER_ID) {
      this.teamData.members = this.teamData.members.filter((element) => element.id != USER_ID);
      try {
        await this.fetcher('DELETE', `/teams/v1/team/${this.teamData.ID}/member/${USER_ID}`);
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
  },
});
