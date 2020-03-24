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
});