interface EditMatch {
  id: string;
  counter_a: number;
  counter_b: number;
  status: string;
  server?: string;
  steam_id?: string;
  discord?: string;
  broadcast?: string;
  show_in_main: boolean;
  date?: string;
  checked: boolean;
}
export const useMatchEditStore = defineStore('MatchEdit', {
  state: () => ({ editMatch: {} as EditMatch }),
  actions: {
    // setModalData(item) {
      // this.editMatch = {
      //   id: item.id,
      //   counter_a: item.counter_a,
      //   counter_b: item.counter_b,
      //   status: item.status,
      //   server: item.server,
      //   steam_id: item.steam_id,
      //   discord: item.discord,
      //   broadcast: item.broadcast,
      //   show_in_main: item.show_in_main,
      //   date: item.date,
      //   checked: item.status === 'play',
      // };
    // },
  },
});
