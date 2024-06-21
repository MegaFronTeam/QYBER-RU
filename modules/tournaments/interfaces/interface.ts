export interface MatchInterface {
  id: string;
  name: string;
  command_a: commandInterface;
  command_b: commandInterface;
  status: {
    label: string;
    value: string;
  };
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
