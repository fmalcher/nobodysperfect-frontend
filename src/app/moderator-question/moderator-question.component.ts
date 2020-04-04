import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-moderator-question',
  templateUrl: './moderator-question.component.html',
  styleUrls: ['./moderator-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeratorQuestionComponent implements OnInit {

  form = new FormGroup({
    question: new FormControl('')
  });

  question$ = this.ds.question$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.question$.subscribe(q => this.form.get('question').setValue(q, { emitEvent: false }))
  }

  submit() {
    const q = this.form.value.question;
    this.ds.setQuestion(q).subscribe();
  }

}
