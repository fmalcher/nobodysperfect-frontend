import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {

  score$ = this.ds.score$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

}
