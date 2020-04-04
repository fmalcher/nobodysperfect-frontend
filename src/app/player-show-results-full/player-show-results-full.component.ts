import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { GameAnswer } from '../shared/types';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-player-show-results-full',
  templateUrl: './player-show-results-full.component.html',
  styleUrls: ['./player-show-results-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerShowResultsFullComponent implements OnInit {

  answers$ = this.ds.answers$;
  question$ = this.ds.question$;

  score$ = this.ds.answers$.pipe(
    map(answers => this.calculateRoundScore(answers))
  );

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  isModerator(a: GameAnswer) {
    return a.name === 'Moderator';
  }

  private calculateRoundScore(answers: GameAnswer[]){
    const rightAnswer = answers.find(this.isModerator);
    if (!rightAnswer) {
      return [];
    }

    const rightAnsweredBy = rightAnswer.answeredBy || [];

    return answers
      .filter(a => !this.isModerator(a))
      .map(a => {
        // give 3 points for every person who chose your answer
        // give 2 points for you choosing the right answer
        return {
          name: a.name,
          score: (a.answeredBy || []).length * 3  + (rightAnsweredBy.includes(a.name) ? 2 : 0)
        };
      });
  }

}
