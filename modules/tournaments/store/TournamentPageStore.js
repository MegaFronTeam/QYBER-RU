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
    ifRefereePage: false,
    // matchesReferee: [],
    teamsForReg: [],
    lastPendingMatch: 0,
  }),
  getters: {
    isNotStart: (state) => {
      if (!state.data.accepting_applications) return true;
      return new Date(state.data.accepting_applications.end) <= new Date();
    },
    formattedMatches: (state) => {
      if (!state.data.matches) return [];
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
      const grid = Object.values(JSON.parse(JSON.stringify(state.data.matches || [])));
      // let mathLength = grid[grid.length - 1].length;
      const newGroup = {
        command: {},
        counter: '0',
        members: false,
        prevText: 'Будет определен',
      };
      grid.map((item) => {
        item.map((subItem) => {
          if (subItem.a === null) {
            subItem.a = newGroup;
          }
          if (subItem.b === null) {
            subItem.b = newGroup;
          }

          return subItem;
        });
        item.indexPlus = item[0].stage;
        return item;
      });

      // const obj = (indexPlus) => {
      //   return {
      //     a: newGroup,
      //     b: newGroup,
      //     status: { value: 'pending' },
      //     indexPlus,
      //   };
      // };
      // if (grid.length === state.data.stages_labels.length) return grid;

      // while (mathLength > 1) {
      //   let mathLengthPrev = mathLength;
      //   mathLength = mathLength / 2;
      //   grid.push(Array.from({ length: mathLength }, (index) => obj(mathLengthPrev + index)));
      //   mathLengthPrev = mathLength;
      // }
      // let indexMatch = 1;
      // for (let i = 0; i < grid.length; i++) {
      //   const element = grid[i];
      //   for (let j = 0; j < element.length; j++) {
      //     const subElement = element[j];
      //     // console.log('subElement', subElement);
      //     if (!subElement.indexPlus) subElement.indexPlus = indexMatch;
      //     indexMatch++;
      //     if (subElement.a.command && subElement.b.command === false) {
      //       subElement.a.counter = 1;
      //       subElement.status.value = 'done';
      //     }
      //     if (subElement.status.value === 'done') {
      //       const winnerEl =
      //         +subElement.a.counter > +subElement.b.counter ? subElement.a : subElement.b;
      //       // console.log('winnerEl', winnerEl);
      //       const winner = JSON.parse(JSON.stringify(winnerEl));
      //       const winnerIndex = Math.floor(j / 2);
      //       const MatchIndex = j % 2 === 0 ? 'a' : 'b';
      //       if (
      //         grid[i + 1] &&
      //         grid[i + 1][winnerIndex][MatchIndex].prevText === 'Будет определен'
      //       ) {
      //         winner.counter = 0;
      //         grid[i + 1][winnerIndex][MatchIndex] = winner;
      //       }
      //     }
      //   }
      // }

      return grid;
    },

    matchesDoubleGrid: (state) => {
      const grid = Object.values(JSON.parse(JSON.stringify(state.data.matches_double || [])));
      // let mathLength = grid[grid.length - 1].length;
      if (grid.length === 0) return [];
      const newGroup = {
        command: {},
        counter: '0',
        members: false,
        prevText: 'Будет определен',
      };
      grid.map((item) => {
        item.map((subItem) => {
          if (subItem.a === null) {
            subItem.a = newGroup;
          }
          if (subItem.b === null) {
            subItem.b = newGroup;
          }

          return subItem;
        });
        item.indexPlus = item[0].stage;
        return item;
      });

      // const obj = (indexPlus) => {
      //   return {
      //     a: newGroup,
      //     b: newGroup,
      //     status: { value: 'pending' },
      //     indexPlus,
      //   };
      // };
      // if (grid.length === state.data.stages_labels.length) return grid;

      // while (mathLength > 1) {
      //   let mathLengthPrev = mathLength;
      //   mathLength = mathLength / 2;
      //   grid.push(Array.from({ length: mathLength }, (index) => obj(mathLengthPrev + index)));
      //   mathLengthPrev = mathLength;
      // }
      // let indexMatch = 1;
      // for (let i = 0; i < grid.length; i++) {
      //   const element = grid[i];
      //   for (let j = 0; j < element.length; j++) {
      //     const subElement = element[j];
      //     // console.log('subElement', subElement);
      //     if (!subElement.indexPlus) subElement.indexPlus = indexMatch;
      //     indexMatch++;
      //     if (subElement.a.command && subElement.b.command === false) {
      //       subElement.a.counter = 1;
      //       subElement.status.value = 'done';
      //     }
      //     if (subElement.status.value === 'done') {
      //       const winnerEl =
      //         +subElement.a.counter > +subElement.b.counter ? subElement.a : subElement.b;
      //       // console.log('winnerEl', winnerEl);
      //       const winner = JSON.parse(JSON.stringify(winnerEl));
      //       const winnerIndex = Math.floor(j / 2);
      //       const MatchIndex = j % 2 === 0 ? 'a' : 'b';
      //       if (
      //         grid[i + 1] &&
      //         grid[i + 1][winnerIndex][MatchIndex].prevText === 'Будет определен'
      //       ) {
      //         winner.counter = 0;
      //         grid[i + 1][winnerIndex][MatchIndex] = winner;
      //       }
      //     }
      //   }
      // }

      return grid;
    },

    matchesReferee: (state) => {
      if (!state.data) return [];
      return Object.values(JSON.parse(JSON.stringify(state.data.matches || [])));
    },
    stages_labelsLength: (state) => {
      return state.data.stages_labels ? state.data.stages_labels.length : 0;
    },
    stages_labels: (state) => {
      if (!state.data.stages_labels) return [];
      const subnameLAN = state.data.stages_labels.filter(
        (item) => item.subname.value.trim() === 'lan',
      );
      const subnameOnline = state.data.stages_labels.filter(
        (item) => item.subname.value.trim() === 'online',
      );
      return [
        { name: 'Online', items: subnameOnline, stageLength: subnameOnline.length },
        { name: 'LAN', items: subnameLAN, stageLength: subnameLAN.length },
      ];
    },
    disciplineIcon: (state) => {
      if (!state.data.discipline) return '';
      const globalStore = useGlobalStore();
      const disciplineList = globalStore.disciplineList;

      const current = globalStore.disciplineList.find(
        (item) => item.slug === state.data.discipline[0].slug,
      );
      return current && current.icon ? current.icon.sizes.thumbnail : '';
    },
    checkIsCanRegTeam: (state) => {
      let isCanReg = false;
      if (!state.teamsForReg.length) return isCanReg;
      if (
        state.teamsForReg.some((team) =>
          state.data.comand_list.some((registeredTeam) => registeredTeam.team.ID === team.ID),
        )
      ) {
        isCanReg = false;
      } else {
        isCanReg = true;
      }

      return isCanReg;
    },
  },
  actions: {
    reset() {
      // this.data = [];
      this.comand_listLength = 0;
      this.indexGroupStore = 0;
      this.indexCoupleStore = 0;
      this.ifRefereePage = false;
      // this.isNotStart = true;
      // this.matchesReferee = [];
      this.teamsForReg = [];
    },
    async fetchData(id) {
      const globalStore = useGlobalStore();

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

        if (data.winners) {
          data.winners = data.winners.map((item, index) => {
            item.amount = new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
              .format(+data.prize[index].amount)
              .replace(/\.00$/, '');
            item.avatar = data.comand_list.find(
              (team) => team.team.ID === item.team.ID,
            ).post_thumbnail;
            return item;
          });
        }
        if (data.stages_labels) {
          data.stages_labels = data.stages_labels.map((item, index) => {
            item.index = index;
            return item;
          });

          // this.stages_labels = [
          //   { name: 'Online', items: subnameOnline, stageLength: subnameOnline.length },
          //   { name: 'LAN', items: subnameLAN, stageLength: subnameLAN.length },
          // ];
        }

        if (data.comand_list) {
          data.teamLength = data.comand_list.length;
          data.comand_list = data.comand_list.map((item) => {
            item.created_at = format(
              new Date(item.created_at.split('/').reverse().join('-')),
              ' d MMMM yyy ',
              {
                locale: ru,
              },
            );
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

        function findLastPendingMatch(matches) {
          for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];

            if (match.some((item) => item.status.value === 'done')) {
              return i;
            }
            // else{
            //   return i§;
            // }
          }
        }

        this.lastPendingMatch = findLastPendingMatch(Object.values(data.matches)) || 0;

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
      const globalStore = useGlobalStore();
      await teamStore.fetchMyTeams().then(() => {
        this.teamsForReg = JSON.parse(JSON.stringify(teamStore.myTeams));
        this.teamsForReg = this.teamsForReg
          .filter((item) => {
            if (item.leagues && item.discipline) {
              return (
                data.leagues[0].slug === item.leagues.slug &&
                data.discipline[0].slug === item.discipline.slug &&
                +item.count_members >= +data.format[0] &&
                +item.post_author === +globalStore.userData.ID
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
  },
});
