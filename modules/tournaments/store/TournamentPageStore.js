import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate } from '@/utils/formatData';

import { useTeamStore } from '@/store/TeamStore';
import { useRefereeStore } from './RefereeStore';

export const useTournamentPageStore = defineStore('tournamentPage', {
  state: () => ({
    data: [],
    currentID: '',
    comand_listLength: 0,
    indexGroupStore: 0,
    indexCoupleStore: 0,
    ifReferee: false,
    matches: [],
    matchesGrid: [],
    stages_labels: {},
    stages_labelsLength: 0,
    isNotStart: true,
    matchesReferee: [],
  }),
  actions: {
    reset() {
      // this.data = [];
      this.comand_listLength = 0;
      this.indexGroupStore = 0;
      this.indexCoupleStore = 0;
      this.ifReferee = false;
      this.matches = [];
      this.matchesGrid = [];
      this.stages_labels = {};
      this.stages_labelsLength = 0;
      // this.isNotStart = true;
      this.matchesReferee = [];
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
        const today = new Date();
        this.matchesReferee = Object.values(JSON.parse(JSON.stringify(data.matches)));
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

        if (data.matches.length || (data.matches[1] && data.matches[1].length > 0)) {
          const matches = Object.values(JSON.parse(JSON.stringify(data.matches)));
          this.matches = matches.map((item, index) => {
            item.map((subItem) => {
              if (subItem.date !== null && subItem.date !== '') {
                console.log(index, 'subItem.date', subItem.date);
                subItem.date = format(new Date(subItem.date), 'd MMMM yyyy  HH:mm', {
                  locale: ru,
                });
              }
              return subItem;
            });
            return item;
          });
          await this.setGrid(data.matches);
        }

        this.matches = this.matches.map((item) =>
          item.filter((subItem) => subItem.b.command !== false),
        );

        if (data.stages_labels) {
          data.stages_labels = data.stages_labels.map((item, index) => {
            item.index = index;
            return item;
          });

          this.stages_labelsLength = data.stages_labels.length;
          const subnameLAN = data.stages_labels.filter((item) => item.subname.trim() === 'LAN');
          const subnameOnline = data.stages_labels.filter(
            (item) => item.subname.trim() === 'Online',
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
    async checkMyTeams() {
      const teamStore = useTeamStore();
      await teamStore.fetchMyTeams().then(() => {
        teamStore.myTeams = teamStore.myTeams.map((item) => {
          if (
            this.data.comand_list &&
            this.data.comand_list.some((team) => team.team.ID === item.ID)
          ) {
            item.Approved = true;
          }
          return item;
        });
      });
    },

    async setGrid(data) {
      const grid = Object.values(data);

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

          console.log('subElement', subElement);
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
      this.matchesGrid = grid;
    },
  },
});
