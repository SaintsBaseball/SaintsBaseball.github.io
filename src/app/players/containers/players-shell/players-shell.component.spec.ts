import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersShellComponent } from './players-shell.component';

describe('PlayersShellComponent', () => {
  let component: PlayersShellComponent;
  let fixture: ComponentFixture<PlayersShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
