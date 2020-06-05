import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTableComponent } from './statistics-table.component';

describe('StatisticsTableComponent', () => {
  let statisticsTableComponent: StatisticsTableComponent;
  let fixture: ComponentFixture<StatisticsTableComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTableComponent);
    statisticsTableComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(statisticsTableComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(statisticsTableComponent.title).toBe('Saints Statistics');
    expect(nativeElement.querySelector('h1').textContent).toBe(statisticsTableComponent.title);
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
