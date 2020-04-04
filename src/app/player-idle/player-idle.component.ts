import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-player-idle',
  templateUrl: './player-idle.component.html',
  styleUrls: ['./player-idle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIdleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
