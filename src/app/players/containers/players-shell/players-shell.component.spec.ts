import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersShellComponent } from './players-shell.component';
import { PlayersListComponent } from '../../components/players-list/players-list.component';

describe('PlayersShellComponent', () => {
  let playersShellComponent: PlayersShellComponent;
  let fixture: ComponentFixture<PlayersShellComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PlayersShellComponent,
        PlayersListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersShellComponent);
    playersShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(playersShellComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(playersShellComponent.title).toBe('Saints Players');
    expect(nativeElement.querySelector('h1').textContent).toBe(playersShellComponent.title);
  });
  
  it('should have the players list', () => {
    expect(nativeElement.querySelector('players-list')).toBeTruthy();
  });
});
