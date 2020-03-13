import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentWrapperComponent } from './main-content-wrapper.component';

describe('MainContentWrapperComponent', () => {
  let mainContentWrapperComponent: MainContentWrapperComponent;
  let fixture: ComponentFixture<MainContentWrapperComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentWrapperComponent);
    mainContentWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(mainContentWrapperComponent).toBeTruthy();
  });

  it('should have the wrapper contents', () => {
    expect(nativeElement.querySelector('div.w3-main')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container')).toBeTruthy();
  });
});
