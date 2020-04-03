import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { take, map, concatMap } from 'rxjs/operators';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-moderator-answers-edit',
  templateUrl: './moderator-answers-edit.component.html',
  styleUrls: ['./moderator-answers-edit.component.scss']
})
export class ModeratorAnswersEditComponent implements OnInit {

  answersOnce$ = this.ds.answers$.pipe(take(1));
  answers$ = this.ds.answers$;
  form: FormGroup;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      answers: new FormArray([])
    });

    this.generateAnswersArray();
  }

  private generateAnswersArray() {
    this.answersOnce$.subscribe(answers => {
      this.form.setControl('answers', new FormArray(answers.map(a => new FormControl(a.answer))));
    });
  }

  submit() {
    this.answersOnce$.pipe(
      map(answers => {
        const formAnswers = this.form.value.answers;
        return answers
          .map((a, i) => ({ ...a, answer: formAnswers[i] }))
          .filter(a => !!a.answer);
      }),

      concatMap(answers => this.ds.setAnswers(answers))
    ).subscribe();
  }

}
