import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, ReplaySubject, from } from 'rxjs';
import { shareReplay, map, take, concatMap, distinctUntilChanged, withLatestFrom, exhaustMap, mergeMap, distinct, toArray } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { GameData, GameAnswer } from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly moderatorName = 'Moderator';
  private playerName$ = new ReplaySubject<string>(1);
  myName$ = this.playerName$.asObservable();

  data$ = timer(0, 2000).pipe(
    exhaustMap(() => this.getDataRaw()),
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

  setAnswers(answers: GameAnswer[]) {
    return this.http.post(environment.apiUrl + '/setanswers', { answers },  { responseType: 'text' });
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
