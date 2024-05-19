import { ref, reactive } from 'vue';
import axios from 'axios';
// import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from './globalStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useTeamStore() {
  const loader = ref(true);
  const isCaptain = ref(false);
  const myTeams = ref([]);
  const teamData = reactive([]);

  const fetcher = async (method, url) => {
    const globalStore = useGlobalStore();
    const API_KEY = globalStore.API_KEY;
    const EMAIL = globalStore.email;

    try {
      const response = await axios(`${BASE_URL}${url}`, {
        method: method,
        headers: {
          Authorization: 'Basic ' + btoa(`${EMAIL}:${API_KEY}`),
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchMyTeams = async () => {
    try {
      const data = await fetcher('GET', '/teams/v1/my');
      myTeams.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeam = async (id) => {
    try {
      const data = await fetcher('GET', `/teams/v1/team/${id}`);
      teamData.members = data.members;
      console.log(teamData);

      teamData.members.forEach((member) => {
        if (+member.id === +'18') {
          isCaptain.value = true;
        }
      });

      loader.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeamMember = async (USER_ID) => {
    teamData.members = teamData.members.filter((element) => element.id != USER_ID);
    try {
      await fetcher('DELETE', `/teams/v1/team/${teamData.ID}/member/${USER_ID}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    loader,
    isCaptain,
    myTeams,
    teamData,
    fetchMyTeams,
    fetchTeam,
    deleteTeamMember,
  };
}
