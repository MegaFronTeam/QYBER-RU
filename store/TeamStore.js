import axios from 'axios';
import { useGlobalStore } from './globalStore';
import { useRoute } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    loader: true,
    isCaptain: false,
    myTeams: [],
    teamData: [],
    isCreate: false,
    currentTeamID: '',
    formDataCreateTeam: {
      name: '',
      description: '',
      leagues: '',
      discipline: '',
      logo: null,
      count_members: 1,
    },
    disabledBtn: true,
    inviteEmail: '',
  }),
  actions: {
    async fetcher(method, url, data = null) {
      const globalStore = useGlobalStore();
      const API_KEY = globalStore.API_KEY;
      const EMAIL = globalStore.email;
      if (!API_KEY || !EMAIL) return;
      return await axios(`${BASE_URL}${url}`, {
        method: method,
        headers: {
          Authorization: 'Basic ' + btoa(`${EMAIL}:${API_KEY}`),
        },
        data,
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
    async createTeam() {
      const formData = new FormData();
      Object.keys(this.formDataCreateTeam).forEach((key) => {
        formData.append(key, this.formDataCreateTeam[key]);
      });
      console.log(formData);

      try {
        const response = await this.fetcher('POST', '/teams/v1/create', formData);
        const data = await response.data;
        if (data) {
          console.log(data);
          this.isCreate = true;
          this.myTeams.push(data);
          console.log(this.myTeams);
          Object.keys(this.formDataCreateTeam).forEach((key) => {
            this.formDataCreateTeam[key] = '';
          });
          setTimeout(() => {
            this.isCreate = false;
          }, 1500);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async fetchTeam(id) {
      try {
        const globalStore = useGlobalStore();
        const res = await this.fetcher('GET', `/teams/v1/team/${id}`);
        const data = res.data;

        this.teamData = data;
        console.log(this.teamData);

        this.teamData.members.forEach((member) => {
          if (member.id === globalStore.userData.ID) {
            this.isCaptain = true;
          }
        });

        this.loader = false;
      } catch (error) {
        console.log(error);
      }
    },
    async inviteMember() {
      try {
        const response = await this.fetcher('POST', `/teams/v1/team/${this.currentTeamID}/member`, {
          email: this.inviteEmail,
        });
        const data = await response.data;
        console.log(data);
        if (data) {
          this.isCreate = true;
          this.inviteEmail = '';
          this.fetchTeam(currentTeamID);
          setTimeout(() => {
            this.isCreate = false;
          }, 1500);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
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
  watch: {
    inviteEmail() {
      if (this.inviteEmail.length > 0) {
        this.disabledBtn = false;
      } else {
        this.disabledBtn = true;
      }
    },
  },
});
