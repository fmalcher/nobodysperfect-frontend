import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { GameAnswer } from '../shared/types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player-show-results-full',
  templateUrl: './player-show-results-full.component.html',
  styleUrls: ['./player-show-results-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerShowResultsFullComponent implements OnInit {

  answers$ = this.ds.answers$;
  question$ = this.ds.question$;

  // TODO: real calculation
  score$ = this.ds.answers$.pipe(
    map(() => ([
      { name: 'Cathi', score: 2 },
      { name: 'Lisa', score: 0 },
      { name: 'Ferdi', score: 3 },
    ]))
  );

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  isModerator(a: GameAnswer) {
    return a.name === 'Moderator';
  }

}
