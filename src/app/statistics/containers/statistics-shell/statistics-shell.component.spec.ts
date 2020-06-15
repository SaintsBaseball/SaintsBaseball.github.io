import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsShellComponent } from './statistics-shell.component';
import { StatisticsSelectorComponent } from '../../components/statistics-selector/statistics-selector.component';
import { StatisticsTableComponent } from '../../components/statistics-table/statistics-table.component';
import { StatisticsServiceMock } from 'src/app/testClasses/statistics-service-mock';
import { EffectsModule } from '@ngrx/effects';
import { StatisticsEffects } from '../../state/statistic.effects';

describe('StatisticsShellComponent', () => {
  let statisticsShellComponent: StatisticsShellComponent;
  let fixture: ComponentFixture<StatisticsShellComponent>;
  let nativeElement;
  let statisticsServiceMock: StatisticsServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsShellComponent,
        StatisticsSelectorComponent,
        StatisticsTableComponent
      ],
      providers: [
        {
          provide: 'IStatisticsService',
          useClass: StatisticsServiceMock
        }
      ],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([StatisticsEffects])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsShellComponent);
    statisticsShellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    statisticsServiceMock = TestBed.get('IStatisticsService');
  });

  it('should create', () => {
    expect(statisticsShellComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(statisticsShellComponent.title).toBe('Saints Statistics');
    expect(nativeElement.querySelector('h1').textContent).toBe(statisticsShellComponent.title);
  });

  it('should have the statistics selector', () => {
    expect(nativeElement.querySelector('statistics-selector')).toBeTruthy();
  });

  it('should have the statistics table', () => {
    expect(nativeElement.querySelector('statistics-table')).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load the player hitting statistics', () => {
      expect(statisticsServiceMock.getPlayerHittingStatistics.callCount).toBe(1);
    });
  });
});
