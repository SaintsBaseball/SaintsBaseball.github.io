import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsShellComponent } from './statistics-shell.component';

describe('StatisticsShellComponent', () => {
  let statisticsShellComponent: StatisticsShellComponent;
  let fixture: ComponentFixture<StatisticsShellComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsShellComponent);
    statisticsShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(statisticsShellComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(statisticsShellComponent.title).toBe('Saints Statistics');
    expect(nativeElement.querySelector('h1').textContent).toBe(statisticsShellComponent.title);
  });
});
