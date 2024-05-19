import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from './globalStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    loader: true,
    isCaptain: false,
    myTeams: [],
    teamData: [],
  }),
  actions: {
    async fetcher(method, url) {
      const globalStore = useGlobalStore();
      const API_KEY = globalStore.API_KEY;
      const EMAIL = globalStore.email;

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
        console.log(this.teamData);

        this.teamData.members.forEach((member) => {
          if (+member.id === +'18') {
            this.isCaptain = true;
          }
        });

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
  persist: {storage: persistedState.localStorage}
});
