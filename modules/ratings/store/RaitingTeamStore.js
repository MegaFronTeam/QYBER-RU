import { defineStore } from 'pinia';
import fetcher from '../services/fetcher';
import { useGlobalStore } from '~/store/globalStore';

export const useRaitingTeamStore = defineStore('raitingTeamStore', {
  state: () => ({
    userTeamData: [],
    totalRecords: 0,
    teamData: [],
    error: '',
    captainData: {},
  }),
  getters: {
    region: (state) => {
      const region = state.captainData.region;
      if (!region) return '';

      const globalStore = useGlobalStore();
      const regions = globalStore.regions;
      // return region, regions;
      return regions.find((item) => +item.id === +region).title.rendered;
    },
  },
  actions: {
    async fetchUserTeams(url, method) {
      await fetcher(url, method).then((response) => {
        if (response.status === 200) {
          this.userTeamData = response.data;
          this.totalRecords = Number(response.headers['x-wp-total']);
        }
      });
    },
    async fetchTeam(url, method) {
      await fetcher(url, method).then((response) => {
        if (response.status === 200) {
          this.teamData = response.data;
          const captainId = response.data.members.find(
            (member) => member.role.value === 'captain',
          ).id;
          fetcher(`/wp/v2/teams?member=${captainId}`).then((response) => {
            if (response.status === 200) {
              this.captainData = response.data[0];
            }
          });
        }
        return (this.error = response.data.message);
      });
    },
  },
});
