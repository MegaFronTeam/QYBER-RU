import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from '@/store/globalStore';
// import {useTournamentPageStore} from '@/store/tournamentPageStore';

export const useTournamentPageStore = defineStore({
  id: 'myTournamentPageStore',
  state: () => ({
    data: [],
  }),
  actions: {},
});
