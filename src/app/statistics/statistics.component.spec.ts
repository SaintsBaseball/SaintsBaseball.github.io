import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let statisticsComponent: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    statisticsComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(statisticsComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(statisticsComponent.title).toBe('Saints Statistics');
    expect(nativeElement.querySelector('h1').textContent).toBe(statisticsComponent.title);
  });

  it('should have a dropdown to select a season', () => {
    expect(nativeElement.querySelector('select')).toBeTruthy();
    const defaultOption = nativeElement.querySelector('option');
    expect(defaultOption.textContent).toBe('Season');
  });

  it('should have a table for the statistics', () => {
    expect(nativeElement.querySelector('table#stats-table')).toBeTruthy();
    expect(nativeElement.querySelector('table#stats-table thead')).toBeTruthy();
    expect(nativeElement.querySelector('table#stats-table thead tr')).toBeTruthy();
    expect(nativeElement.querySelector('table#stats-table tbody')).toBeTruthy();
  });
});
