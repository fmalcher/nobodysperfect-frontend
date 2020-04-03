import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorQuestionComponent } from './moderator-question.component';

describe('ModeratorQuestionComponent', () => {
  let component: ModeratorQuestionComponent;
  let fixture: ComponentFixture<ModeratorQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
