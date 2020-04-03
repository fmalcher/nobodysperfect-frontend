import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss']
})
export class PlayerNameComponent implements OnInit {

  myName$ = this.ds.myName$;

  showForm = true;

  form = new FormGroup({
    name: new FormControl('')
  });

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.ds.myName$.subscribe(name => {
      this.form.get('name').setValue(name, { emitEvent: false });
      if (name) {
        this.showForm = false;
      }
    });
  }

  doShowForm() {
    this.showForm = true;
  }

  submit() {
    this.ds.setName(this.form.value.name);
  }

}
