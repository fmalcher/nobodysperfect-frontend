import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorOwnAnswerComponent } from './moderator-own-answer.component';

describe('ModeratorOwnAnswerComponent', () => {
  let component: ModeratorOwnAnswerComponent;
  let fixture: ComponentFixture<ModeratorOwnAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorOwnAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorOwnAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
