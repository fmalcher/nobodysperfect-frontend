import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-player-wait-results',
  templateUrl: './player-wait-results.component.html',
  styleUrls: ['./player-wait-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerWaitResultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
