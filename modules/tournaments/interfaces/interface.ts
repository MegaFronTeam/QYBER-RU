export interface MatchInterface {
  id: string;
  name: string;
  a: commandInterface;
  b: commandInterface;
  status?:
    | {
        label: string;
        value: string;
      }
    | string;
  server: string;
  steam_id: string;
  discord: string;
  broadcast: string;
  show_in_main: boolean;
  date: string;
  checked: boolean;
  oldDate?: string;
  time?: string;
}

interface commandInterface {
  command: {
    post_title: string;
  };
  counter: number;
}

export interface TournamentInterface {
  id?: string;
  name?: string;
  discipline?: [
    {
      name: string;
    },
  ];
}
