import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-moderator-own-answer',
  templateUrl: './moderator-own-answer.component.html',
  styleUrls: ['./moderator-own-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeratorOwnAnswerComponent implements OnInit {

  form = new FormGroup({
    answer: new FormControl('')
  });

  question$ = this.ds.question$;
  myAnswer$ = this.ds.myAnswer$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  submit() {
    const answer = this.form.value.answer;
    this.ds.setModAnswer(answer).subscribe();
  }

}
