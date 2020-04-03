import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorAnswersEditComponent } from './moderator-answers-edit.component';

describe('ModeratorAnswersEditComponent', () => {
  let component: ModeratorAnswersEditComponent;
  let fixture: ComponentFixture<ModeratorAnswersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorAnswersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorAnswersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
