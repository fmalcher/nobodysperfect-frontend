import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-player-give-answer',
  templateUrl: './player-give-answer.component.html',
  styleUrls: ['./player-give-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerGiveAnswerComponent implements OnInit {

  form = new FormGroup({
    answer: new FormControl('')
  });

  question$ = this.ds.question$;
  myAnswerText$ = this.ds.myAnswerText$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.myAnswerText$.subscribe(answerText => this.form.get('answer').setValue(answerText, { emitEvent: false }));
  }

  submit() {
    const answer = this.form.value.answer;
    this.ds.setMyAnswer(answer).subscribe();
  }

}
