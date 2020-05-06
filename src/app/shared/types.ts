export interface GameData {
  state: number;
  question: string;
  answers: GameAnswer[];
  score: GameScore[];
}

export interface GameAnswer {
  name: string;
  answer: string;
  answeredBy?: string[];
}

export interface GameScore {
  name: string;
  score: number;
}
