import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let fixture: ComponentFixture<NavigationBarComponent>;
  let navigationBarComponent: NavigationBarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    navigationBarComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(navigationBarComponent).toBeTruthy();
  });
});
