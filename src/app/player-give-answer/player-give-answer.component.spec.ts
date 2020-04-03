import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGiveAnswerComponent } from './player-give-answer.component';

describe('PlayerGiveAnswerComponent', () => {
  let component: PlayerGiveAnswerComponent;
  let fixture: ComponentFixture<PlayerGiveAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGiveAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGiveAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
