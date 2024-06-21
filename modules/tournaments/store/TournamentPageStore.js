import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate } from '@/utils/formatData';

import { useTeamStore } from '@/store/TeamStore';
import { useRefereeStore } from './RefereeStore';
import { useGlobalStore } from '~/store/globalStore';

export const useTournamentPageStore = defineStore('tournamentPage', {
  state: () => ({
    data: [],
    currentID: '',
    comand_listLength: 0,
    indexGroupStore: 0,
    indexCoupleStore: 0,
    ifReferee: false,
    stages_labels: {},
    stages_labelsLength: 0,
    isNotStart: true,
    // matchesReferee: [],
    // teamsForReg: [],
    editMatch: {
      id: 0,
      title: '',
      date: '',
      time: '',
      checked: false,
      editForm: {
        status: '',
        server: '',
        discord: '',
        // broadcast: '',
        // show_in_main: '',
        date: '',
      },
      editResults: {
        counter_a: 0,
        counter_b: 0,
      },
    },
  }),
  getters: {
    formattedMatches: (state) => {
      const matchesArr = Object.values(JSON.parse(JSON.stringify(state.data.matches || [])));
      return matchesArr
        .map((item) => {
          item.map((subItem) => {
            if (subItem.date !== null && subItem.date !== '') {
              subItem.date = format(new Date(subItem.date), 'd MMMM yyyy  HH:mm', {
                locale: ru,
              });
            }
            return subItem;
          });
          return item;
        })
        .map((item) => item.filter((subItem) => subItem.b.command !== false));
    },
    matchesGrid: (state) => {
      if (!state.data.matches) return [];
      const grid = Object.values(JSON.parse(JSON.stringify(state.data.matches || [])));
      let mathLength = grid[grid.length - 1].length;
      const newGroup = {
        command: {},
        counter: '0',
        members: false,
        prevText: 'Будет определен',
      };
      const obj = (indexPlus) => {
        return {
          a: newGroup,
          b: newGroup,
          status: { value: 'pending' },
          indexPlus,
        };
      };
      while (mathLength > 1) {
        let mathLengthPrev = mathLength;
        mathLength = mathLength / 2;
        grid.push(Array.from({ length: mathLength }, (index) => obj(mathLengthPrev + index)));
        mathLengthPrev = mathLength;
      }
      let counter = 1;
      for (let i = 0; i < grid.length; i++) {
        const element = grid[i];
        for (let j = 0; j < element.length; j++) {
          const subElement = element[j];
          // console.log('subElement', subElement);
          if (!subElement.indexPlus) subElement.indexPlus = counter;
          counter++;
          if (subElement.a.command && subElement.b.command === false) {
            subElement.a.counter = 1;
            subElement.status.value = 'done';
          }
          if (subElement.status.value === 'done') {
            const winnerEl =
              subElement.a.counter > subElement.b.counter ? subElement.a : subElement.b;
            const winner = JSON.parse(JSON.stringify(winnerEl));
            winner.counter = 0;
            const winnerIndex = Math.floor(j / 2);
            const MatchIndex = j % 2 === 0 ? 'a' : 'b';
            if (grid[i + 1]) {
              grid[i + 1][winnerIndex][MatchIndex] = winner;
            }
          }
        }
      }
      return grid;
    },
    matchesReferee: (state) => {
      if (!state.data) return [];
      return Object.values(JSON.parse(JSON.stringify(state.data.matches || [])));
    },
  },
  actions: {
    reset() {
      // this.data = [];
      this.comand_listLength = 0;
      this.indexGroupStore = 0;
      this.indexCoupleStore = 0;
      this.ifReferee = false;
      this.stages_labels = {};
      this.stages_labelsLength = 0;
      // this.isNotStart = true;
      // this.matchesReferee = [];
      // this.teamsForReg = [];
    },
    async fetchData(id) {
      if (id !== this.currentID) {
        this.reset();
      }
      const refereeStore = useRefereeStore();
      // const Routeid = route.params.id;
      // const { id: Routeid } = useRoute().params;
      // console.log('Routeid', Routeid);
      // if (id === this.currentID || !id) return;
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/tournaments/${id}`);
        const data = await response.data;

        await this.checkMyTeams(data);
        const today = new Date();
        if (new Date(data.accepting_applications.end) >= today) {
          this.isNotStart = false;
        }

        data.date2 = formatDate(data.date);

        data.date_gmtStartReg = formatDate(data.date_gmt);
        data.accepting_applications.endFormat = formatDate(data.accepting_applications.end);
        data.accepting_applications.startFormat = formatDate(data.accepting_applications.start);
        data.title = data.title.rendered;

        data.prize_fund = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+data.prize_fund)
          .replace(/\.00$/, '');

        if (data.stages_labels) {
          data.stages_labels = data.stages_labels.map((item, index) => {
            item.index = index;
            return item;
          });
          this.stages_labelsLength = data.stages_labels.length;
          const subnameLAN = data.stages_labels.filter(
            (item) => item.subname.value.trim() === 'LAN',
          );
          const subnameOnline = data.stages_labels.filter(
            (item) => item.subname.value.trim() === 'Online',
          );
          this.stages_labels = [
            { name: 'Online', items: subnameOnline, stageLength: subnameOnline.length },
            { name: 'LAN', items: subnameLAN, stageLength: subnameLAN.length },
          ];
        }

        if (data.comand_list) {
          data.teamLength = data.comand_list.length;
          data.comand_list = data.comand_list.map((item) => {
            item.created_at2 = format(new Date(item.team.post_date), 'EE, d MMMM yyyy  в HH:mm', {
              locale: ru,
            });
            //
            return item;
          });

          // this.comand_listLength = await data.comand_list.length;
          // this.gamesLength = await Math.ceil(data.comand_list.length / 2);
          if (
            refereeStore.couples.length === 0 ||
            refereeStore.teamsForefereeLength === refereeStore.comand_listLength
          ) {
            await refereeStore.getGamesLength(data.comand_list);
          }
        }

        this.data = data;
        this.currentID = id;
        if (refereeStore.couples.length === 0 || this.currentID !== refereeStore.savedId) {
          refereeStore.savedId = this.currentID;
          refereeStore.checkTeamForReferee(this.data.comand_list);
          await refereeStore.getGamesLength(data.comand_list);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async checkMyTeams(data) {
      const teamStore = useTeamStore();
      await teamStore.fetchMyTeams().then(() => {
        this.teamsForReg = JSON.parse(JSON.stringify(teamStore.myTeams));
        this.teamsForReg = this.teamsForReg
          .filter((item) => {
            if (item.leagues && item.discipline) {
              return (
                data.leagues[0].slug === item.leagues.slug &&
                data.discipline[0].slug === item.discipline.slug
                // &&
                // +item.count_members >= +data.format[0]
              );
            }
          })
          .map((item) => {
            if (data.comand_list && data.comand_list.some((team) => team.team.ID === item.ID)) {
              // console.log('item', item, this.data.comand_list);
              item.Approved = true;
            }
            return item;
          });
      });
    },

    modifyDate() {
      this.editMatch.date;
      this.editMatch.time;

      let date = '';
      let time = '';

      let year = '';
      let month = '';
      let day = '';
      let hours = '';
      let minutes = '';
      let seconds = '';

      if (this.editMatch.date) {
        year = this.editMatch.date.getFullYear();
        month = String(this.editMatch.date.getMonth() + 1).padStart(2, '0');
        day = String(this.editMatch.date.getDate()).padStart(2, '0');

        date = `${year}-${month}-${day}`;
      }
      if (this.editMatch.time) {
        hours = String(this.editMatch.time.getHours()).padStart(2, '0');
        minutes = String(this.editMatch.time.getMinutes()).padStart(2, '0');
        seconds = String(this.editMatch.time.getSeconds()).padStart(2, '0');

        time = `${hours}:${minutes}:${seconds}`;
      }

      this.editMatch.editForm.date = `${date} ${time}`;
    },
    checkMatchStatus() {
      this.editMatch.checked
        ? (this.editMatch.editForm.status = 'pending')
        : (this.editMatch.editForm.status = '');
    },
    async postEditedMatch() {
      const globalStore = useGlobalStore();
      if (this.editMatch.id) {
        try {
          const formData = new FormData();

          Object.keys(this.editMatch.editForm).forEach((key) => {
            if (this.editMatch.editForm[key] !== '') {
              formData.append(key, this.editMatch.editForm[key]);
            }
          });

          const response = await axios.post(
            `${BASE_URL}/tournaments/v1/update-match/${this.editMatch.id}`,
            formData,
            {
              headers: {
                Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
                'Content-Type': 'application/json',
              },
            },
          );
          const data = await response.data;

          return data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async editResults() {
      const globalStore = useGlobalStore();
      try {
        const formData = new FormData();

        formData.append('counter_a', this.editMatch.editResults.counter_a);
        formData.append('counter_b', this.editMatch.editResults.counter_b);

        const response = await axios.post(
          `${BASE_URL}/tournaments/v1/update-match/${this.editMatch.id}`,
          formData,
          {
            headers: {
              Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.data;

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
