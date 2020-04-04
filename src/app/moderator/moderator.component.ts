import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeratorComponent implements OnInit {

  state$ = this.ds.state$;
  answers$ = this.ds.answers$;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

  setState(state: number) {
    this.ds.setState(state).subscribe();
  }

  reset() {
    this.ds.reset().subscribe();
  }

}
