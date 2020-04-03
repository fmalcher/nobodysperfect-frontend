import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShowResultsFullComponent } from './player-show-results-full.component';

describe('PlayerShowResultsFullComponent', () => {
  let component: PlayerShowResultsFullComponent;
  let fixture: ComponentFixture<PlayerShowResultsFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShowResultsFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShowResultsFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
