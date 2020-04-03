import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { timer, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMapTo, shareReplay, map, take, concatMap, distinctUntilChanged } from 'rxjs/operators';
import { GameData, GameAnswer } from './types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  myName$ = new ReplaySubject(1);

  data$ = timer(1500).pipe(
    switchMapTo(this.getData()),
    shareReplay(1)
  );

  state$ = this.data$.pipe(
    map(data => data.state),
    distinctUntilChanged()
  );

  constructor(private http: HttpClient) { }

  private getData() {
    return this.http.get<GameData>(environment.dataJSONUrl);
  }

  setName(name: string) {
    this.myName$.next(name);
  }

  setQuestion(question: string) {
    return this.http.post(environment.apiUrl + '/setquestion', { question });
  }

  setAnswers(answers: GameAnswer[]) {
    return this.http.post(environment.apiUrl + '/setanswers', { answers });
  }

  setAnswer(answer: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(name => this.http.post(environment.apiUrl + '/setanswers', { answer: { name, answer } }))
    );
  }

  chooseAnswer(answerName: string) {
    return this.myName$.pipe(
      take(1),
      concatMap(playerName => this.http.post(environment.apiUrl + '/chooseanswer', { playerName, answerName }))
    );
  }
}
