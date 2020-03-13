import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentWrapperComponent } from './main-content-wrapper.component';

describe('MainContentWrapperComponent', () => {
  let component: MainContentWrapperComponent;
  let fixture: ComponentFixture<MainContentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
