import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentComponent } from './main-content.component';

describe('MainContentWrapperComponent', () => {
  let mainContentComponent: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentComponent);
    mainContentComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(mainContentComponent).toBeTruthy();
  });

  it('should have the wrapper contents', () => {
    expect(nativeElement.querySelector('div.w3-main')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container')).toBeTruthy();
  });
});
