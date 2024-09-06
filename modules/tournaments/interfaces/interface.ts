export interface MatchInterface {
  id: string;
  name: string;
  title: {
    rendered: string;
  };
  a: commandInterface;
  b: commandInterface;
  status:
    | {
        label: string;
        value: string;
      }
    | MatchStatus;
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

enum MatchStatus {
  done = 'done',
  play = 'play',
  pending = 'pending',
}

export interface commandInterface {
  command: {
    ID: number;
    post_title: string;
    post_thumbnail: string;
  };

  counter: number;
  members: MembersInterface;
  disqualification: boolean;
}

export interface MembersInterface {
  avatar: {
    sizes: {
      thumbnail: string;
    };
  };
  nickname: string;
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
