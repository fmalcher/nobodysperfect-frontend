import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player-choose-answer',
  templateUrl: './player-choose-answer.component.html',
  styleUrls: ['./player-choose-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerChooseAnswerComponent implements OnInit {

  answers$ = this.ds.answers$;
  myChosenAnswerName$ = this.ds.myChosenAnswerName$;
  question$ = this.ds.question$;

  buttonsDisabled$ = this.myChosenAnswerName$.pipe(map(e => !!e));

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  select(name: string) {
    this.ds.chooseAnswer(name).subscribe();
  }

}
