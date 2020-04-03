import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerIdleComponent } from './player-idle.component';

describe('PlayerIdleComponent', () => {
  let component: PlayerIdleComponent;
  let fixture: ComponentFixture<PlayerIdleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerIdleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
