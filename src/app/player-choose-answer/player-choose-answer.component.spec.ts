import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerChooseAnswerComponent } from './player-choose-answer.component';

describe('PlayerChooseAnswerComponent', () => {
  let component: PlayerChooseAnswerComponent;
  let fixture: ComponentFixture<PlayerChooseAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerChooseAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerChooseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
