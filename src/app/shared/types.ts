export interface GameData {
  state: number;
  question: string;
  answers: GameAnswer[];
}

export interface GameAnswer {
  name: string;
  answer: string;
  answeredBy: string[];
}
