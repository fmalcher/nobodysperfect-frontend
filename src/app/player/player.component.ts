import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  state$ = this.ds.state$;
  myName$ = this.ds.myName$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

}
