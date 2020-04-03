import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-player-give-answer',
  templateUrl: './player-give-answer.component.html',
  styleUrls: ['./player-give-answer.component.scss']
})
export class PlayerGiveAnswerComponent implements OnInit {

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
    this.ds.setAnswer(answer).subscribe();
  }

}
