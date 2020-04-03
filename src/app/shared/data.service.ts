import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, ReplaySubject } from 'rxjs';
import { switchMapTo, shareReplay, map, take, concatMap, distinctUntilChanged, withLatestFrom, filter, tap } from 'rxjs/operators';
import { GameData, GameAnswer } from './types';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  myName$ = new ReplaySubject<string>(1);

  data$ = timer(0, 1500).pipe(
    switchMapTo(this.getDataRaw()),
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

  myAnswer$ = this.answers$.pipe(
    withLatestFrom(this.myName$),
    map(([answers, myName]) => answers.find(a => a.name === myName)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  myChosenAnswerName$ = this.answers$.pipe(
    withLatestFrom(this.myName$),
    map(([answers, myName]) => answers.find(a => a.answeredBy && a.answeredBy.includes(myName))),
    filter(e => !!e),
    map(a => a.name),
    distinctUntilChanged(),
    shareReplay(1),
  );

  constructor(private http: HttpClient) {
    const name = localStorage.getItem('playerName');
    this.myName$.next(name);
  }

  private getDataRaw() {
    return this.http.get(environment.dataJSONUrl, { responseType: 'text' });
  }

  setName(name: string) {
    this.myName$.next(name);
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

  setAnswer(answer: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(name => this.http.post(environment.apiUrl + '/setanswer', { answer: { name, answer } },  { responseType: 'text' }))
    );
  }

  setModAnswer(answer: string) {
    return this.http.post(environment.apiUrl + '/setanswer', { answer: { name: 'Moderator', answer } },  { responseType: 'text' });
  }


  chooseAnswer(answerName: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(playerName => this.http.post(environment.apiUrl + '/chooseanswer', { playerName, answerName },  { responseType: 'text' }))
    );
  }
}
