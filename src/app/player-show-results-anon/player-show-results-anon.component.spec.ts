import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShowResultsAnonComponent } from './player-show-results-anon.component';

describe('PlayerShowResultsAnonComponent', () => {
  let component: PlayerShowResultsAnonComponent;
  let fixture: ComponentFixture<PlayerShowResultsAnonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShowResultsAnonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShowResultsAnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
