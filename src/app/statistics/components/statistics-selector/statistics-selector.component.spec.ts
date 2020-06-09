import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSelectorComponent } from './statistics-selector.component';

describe('StatisticsSelectorComponent', () => {
  let statisticsSelectorComponent: StatisticsSelectorComponent;
  let fixture: ComponentFixture<StatisticsSelectorComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsSelectorComponent);
    statisticsSelectorComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(statisticsSelectorComponent).toBeTruthy();
  });

  it('should have a dropdown to select a season', () => {
    expect(nativeElement.querySelector('select')).toBeTruthy();
    const defaultOption = nativeElement.querySelector('option');
    expect(defaultOption.textContent).toBe('Season');
  });
});
