import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataService } from '../shared/data.service';
import { GameAnswer, GameScore } from '../shared/types';

@Component({
  selector: 'app-player-show-results-full',
  templateUrl: './player-show-results-full.component.html',
  styleUrls: ['./player-show-results-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerShowResultsFullComponent implements OnInit {

  @Input() anonym = false;

  answers$ = this.ds.answers$;
  question$ = this.ds.question$;

  isModerator = this.ds.isModerator;
  roundScore$ = this.ds.roundScore$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {}




}
