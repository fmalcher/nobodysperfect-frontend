import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-moderator-own-answer',
  templateUrl: './moderator-own-answer.component.html',
  styleUrls: ['./moderator-own-answer.component.scss'],
})
export class ModeratorOwnAnswerComponent implements OnInit {

  form = new FormGroup({
    answer: new FormControl('')
  });

  question$ = this.ds.question$;
  moderatorAnswerText$ = this.ds.moderatorAnswerText$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.moderatorAnswerText$.subscribe(answerText => {
      this.form.get('answer').setValue(answerText, { emitEvent: false })
    });
  }

  submit() {
    const answer = this.form.value.answer;
    this.ds.setModAnswer(answer).subscribe();
  }

}
