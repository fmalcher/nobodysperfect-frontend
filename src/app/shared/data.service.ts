import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, ReplaySubject, from, forkJoin, EMPTY } from 'rxjs';
import { shareReplay, map, take, concatMap, distinctUntilChanged, withLatestFrom, exhaustMap, mergeMap, distinct, toArray, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GameData, GameAnswer, GameScore } from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly moderatorName = 'Moderator';
  private playerName$ = new ReplaySubject<string>(1);
  myName$ = this.playerName$.asObservable();

  data$ = timer(0, 2000).pipe(
    exhaustMap(() => this.getDataRaw()),
    catchError(() => EMPTY),
    distinctUntilChanged(),
    map(raw => JSON.parse(raw) as GameData),
    shareReplay(1)
  );

  state$ = this.data$.pipe(
    map(data => data.state),
    distinctUntilChanged()
  );

  question$ = this.data$.pipe(
    map(data => data.question),
    distinctUntilChanged()
  );

  answers$ = this.data$.pipe(
    map(data => data.answers)
  );

  score$ = this.data$.pipe(
    map(data => data.score)
  );

  numberOfChosens$ = this.answers$.pipe(
    mergeMap(answers => from(answers).pipe(
      mergeMap(a => from(a.answeredBy || [])),
      distinct(),
      toArray(),
      map(arr => arr.length)
    ))
  );

  myAnswerText$ = this.answers$.pipe(
    withLatestFrom(this.myName$),
    map(([answers, myName]) => answers.find(a => a.name === myName)),
    map(a => a?.answer),
    distinctUntilChanged(),
    shareReplay(1)
  );

  moderatorAnswerText$ = this.answers$.pipe(
    map(answers => answers.find(a => a.name === this.moderatorName)),
    map(a => a?.answer),
    distinctUntilChanged(),
    shareReplay(1)
  );

  myChosenAnswerName$ = this.answers$.pipe(
    withLatestFrom(this.myName$),
    map(([answers, myName]) => answers.find(a => a.answeredBy && a.answeredBy.includes(myName))),
    map(a => a && a.name),
    distinctUntilChanged(),
    shareReplay(1),
  );

  roundScore$ = this.answers$.pipe(
    map(answers => this.calculateRoundScore(answers))
  );

  constructor(private http: HttpClient) {
    this.getNameFromStorage();
  }

  private getDataRaw() {
    return this.http.get(environment.dataJSONUrl, { responseType: 'text' });
  }

  private getNameFromStorage() {
    const name = localStorage.getItem('playerName');
    if (name) {
      this.playerName$.next(name);
    }
  }

  private calculateRoundScore(answers: GameAnswer[]): GameScore[] {
    const rightAnswer = answers.find(a => this.isModerator(a));
    if (!rightAnswer) {
      return [];
    }

    const rightAnsweredBy = rightAnswer.answeredBy || [];

    return answers
      .filter(a => !this.isModerator(a))
      .map(a => {
        // +3 to you for every person who chose your answer
        // +2 to you for choosing the right answer
        return {
          name: a.name,
          score: (a.answeredBy || []).length * 3  + (rightAnsweredBy.includes(a.name) ? 2 : 0)
        };
      });
  }

  isModerator(a: GameAnswer) {
    return a.name === this.moderatorName;
  }

  sumupRoundScore() {
    return forkJoin([
      this.roundScore$.pipe(take(1)),
      this.score$.pipe(take(1)),
    ]).pipe(
      map(([roundScore, score]) => {
        return roundScore.map(rs => {
          const scoreEntry = score.find(s => s.name === rs.name);
          if (!scoreEntry) {
            return rs;
          } else {
            return {
              name: scoreEntry.name,
              score: scoreEntry.score + rs.score
            };
          }
        })
        .sort((a, b) => b.score - a.score);
      }),
      concatMap(score => this.setScore(score))
    );
  }

  setName(name: string) {
    this.playerName$.next(name);
    localStorage.setItem('playerName', name);
  }

  setQuestion(question: string) {
    return this.http.post(environment.apiUrl + '/setquestion', { question }, { responseType: 'text' });
  }

  setState(state: number) {
    return this.http.post(environment.apiUrl + '/setstate', { state },  { responseType: 'text' });
  }

  reset() {
    return this.http.post(environment.apiUrl + '/reset', null,  { responseType: 'text' });
  }

  resetFull() {
    return this.http.post(environment.apiUrl + '/resetfull', null,  { responseType: 'text' });
  }

  setAnswers(answers: GameAnswer[]) {
    return this.http.post(environment.apiUrl + '/setanswers', { answers },  { responseType: 'text' });
  }

  setScore(score: GameScore[]) {
    return this.http.post(environment.apiUrl + '/setscore', { score },  { responseType: 'text' });
  }

  setAnswer(name: string, answer: string) {
    return this.http.post(environment.apiUrl + '/setanswer', { answer: { name, answer } },  { responseType: 'text' });
  }

  setMyAnswer(answer: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(name => this.setAnswer(name, answer))
    );
  }

  setModAnswer(answer: string) {
    return this.setAnswer(this.moderatorName, answer);
  }

  chooseAnswer(answerName: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(playerName => this.http.post(environment.apiUrl + '/chooseanswer', { playerName, answerName },  { responseType: 'text' }))
    );
  }
}
