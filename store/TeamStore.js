import axios from 'axios';
import { useGlobalStore } from './globalStore';
import { useRouter } from 'vue-router';
import { useBreadcrumbsStore } from './BreadcrumbStore';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useToast } from 'primevue/usetoast';

import teamService from '~/services/teamService';

import { formatDate } from '@/utils/formatData';

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    router: useRouter(),
    loader: true,

    myTeams: [],
    teamData: [],
    isCreate: false,
    currentTeamID: '',
    tournaments: [],
    formDataCreateTeam: {
      name: '',
      leagues: [],
      discipline: '',
      logo: null,
      count_members: 1,
    },

    formDataEditTeam: {},

    disabledBtn: true,
    inviteEmail: '',
    toast: useToast(),
    potentialMembers: {},
  }),
  getters: {
    isCaptain: (state) => {
      if (!state.teamData.members) return false;

      const globalStore = useGlobalStore();
      const captineID = state.teamData.members.find((member) => member.role.value === 'captain').id;

      return captineID === globalStore.userData.ID;
    },
  },
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
        // if (data.length > 0) {
        this.myTeams = data;
        // }
      } catch (err) {
        console.log(err);
      }
    },
    async showToast(severity, summary, detail) {
      this.toast.add({
        severity,
        summary,
        detail,
        life: 10000,
      });
    },
    async createTeam(url = '/teams/v1/create', id = '') {
      const keysToRussian = {
        name: 'Название',
        leagues: 'Лигу',
        discipline: 'Дисциплину',
        logo: 'Логотип',
      };

      Object.keys(this.formDataCreateTeam).forEach((key) => {
        if (this.formDataCreateTeam[key] === '' || this.formDataCreateTeam[key] === null) {
          console.log(key);
          if (key === 'logo') {
            this.showToast('error', 'Ошибка', `Добавьте логотип`);
          } else if (key === 'discipline' || key === 'leagues') {
            this.showToast('error', 'Ошибка', `Выберите ${keysToRussian[key]}`);
          } else {
            this.showToast('error', 'Ошибка', `Поле ${keysToRussian[key]} не заполнено`);
          }
          return;
        }
      });

      if (Object.keys(this.formDataCreateTeam).some((key) => this.formDataCreateTeam[key] === ''))
        return;

      const formData = new FormData();
      Object.keys(this.formDataCreateTeam).forEach((key) => {
        formData.append(key, this.formDataCreateTeam[key]);
      });
      console.log(formData);

      try {
        const customUrl = id ? `${url}/${id}` : url;
        const response = await this.fetcher('POST', customUrl, formData);
        const data = await response.data;
        if (data) {
          this.myTeams.push(data);

          Object.keys(this.formDataCreateTeam).forEach((key) => {
            if (key !== 'leagues') {
              this.formDataCreateTeam[key] = '';
            }
          });
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async teamUpdate() {
      const formData = new FormData();
      Object.keys(this.formDataEditTeam).forEach((key) => {
        formData.append(key, this.formDataEditTeam[key]);
      });
      console.log(formData);

      try {
        const customUrl = '/teams/v1/update/' + this.teamData.ID;
        const response = await this.fetcher('POST', customUrl, formData);
        const data = await response.data;
        console.log(data);
        if (data) {
          this.fetchTeam(this.teamData.ID);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },

    async fetchTeam(id) {
      try {
        const breadcrumbsStore = useBreadcrumbsStore();
        const globalStore = useGlobalStore();
        const res = await this.fetcher('GET', `/teams/v1/team/${id}`);
        const data = res.data;
        this.currentTeamID = id;

        if (data.tournaments > 0) {
          await this.formatTournament(data.tournaments);
        }

        data.members = data.members.filter((item) => item.active === true);

        this.teamData = data;
        this.formDataEditTeam = {
          name: data.post_title,
          logo: null,
        };

        breadcrumbsStore.setNameFromIds(data.post_title);
        this.getPotentialMembers(id);
        this.loader = false;
      } catch (error) {
        console.log(error);
      }
    },
    async formatTournament(data) {
      data = data.map((item) => {
        item.date = formatDate(item.date, 'dd.MM.yyyy, HH:mm');
        item.prize_fund = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+item.prize_fund)
          .replace(/\.00$/, '');
        return item;
      });
    },
    async inviteMember(email) {
      try {
        const response = await this.fetcher('POST', `/teams/v1/team/${this.currentTeamID}/member`, {
          email,
        });
        const data = await response.data;
        console.log(data);
        if (data) {
          this.isCreate = true;
          this.fetchTeam(this.currentTeamID);
          // setTimeout(() => {
          //   this.isCreate = false;
          // }, 1500);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    hideModal() {
      this.isCreate = false;
    },
    async deleteTeam(teamId) {
      const id = this.currentTeamID;
      try {
        const response = await this.fetcher('DELETE', `/teams/v1/delete/${teamId}`);
        const data = await response;
        // // console.log(data);
        if (data) {
          if (teamId === id) {
            this.router.push('/cabinet');
          }
          this.fetchMyTeams();
        }
        this.fetchMyTeams();
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async deleteTeamMember(USER_ID) {
      this.teamData.members = this.teamData.members.filter((element) => element.id != USER_ID);
      try {
        const response = await this.fetcher(
          'DELETE',
          `/teams/v1/team/${this.teamData.ID}/member/${USER_ID}`,
        );
        const data = await response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async leaguesStatus() {
      const globalStore = useGlobalStore();
      if (globalStore.userData.leagues && globalStore.userData.leagues.length !== 2) {
        this.formDataCreateTeam.leagues = [globalStore.userData.leagues[0].slug];
        console.log('qq', this.formDataCreateTeam.leagues);
      }
    },
    async getPotentialMembers(teamId) {
      const response = await teamService.getPotentialMembers(teamId);
      this.potentialMembers = response;
      // console.log(response);
      // return response;
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
