export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  coach: {
    id: number;
    name: string;
    nationality: string;
  };
  leagueRank: number;
  formation: string;
  lineup: [];
  bench: [];
}

export interface Match {
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null | string;
    stages: string[];
  };
  id: number;
  utcDate: string;
  status: string;
  minute: null | number;
  injuryTime: null | number;
  attendance: null | number;
  venue: string;
  matchday: number;
  stage: string;
  group: null | string;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: null | string;
    duration: string;
    fullTime: {
      home: null | number;
      away: null | number;
    };
    halfTime: {
      home: null | number;
      away: null | number;
    };
  };
  goals: [];
  penalties: [];
  bookings: [];
  substitutions: [];
  odds: {
    msg: string;
  };
  referees: {
    id: number;
    name: string;
    type: string;
    nationality: string;
  }[];
}

export interface League {
  id: string;
  name: string;
  matchday: number;
}

export interface MatchState {
  matches: Match[];
  loading: boolean;
}

export interface LeagueStates {
  [key: string]: MatchState;
}
