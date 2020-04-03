import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { GameAnswer } from '../shared/types';

@Component({
  selector: 'app-player-show-results-full',
  templateUrl: './player-show-results-full.component.html',
  styleUrls: ['./player-show-results-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerShowResultsFullComponent implements OnInit {

  answers$ = this.ds.answers$;
  question$ = this.ds.question$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  isModerator(a: GameAnswer) {
    return a.name === 'Moderator';
  }

}
