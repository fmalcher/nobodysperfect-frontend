import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerWaitResultsComponent } from './player-wait-results.component';

describe('PlayerWaitResultsComponent', () => {
  let component: PlayerWaitResultsComponent;
  let fixture: ComponentFixture<PlayerWaitResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerWaitResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerWaitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
