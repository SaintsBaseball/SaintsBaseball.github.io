import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('ShellComponent', () => {
  let shellComponent: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    shellComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(shellComponent).toBeTruthy();
  });

  it('should have the wrapper contents', () => {
    expect(nativeElement.querySelector('div.w3-main')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64')).toBeTruthy();
    expect(nativeElement.querySelector('div.w3-main > div.w3-row.w3-padding-64 > div.w3-container')).toBeTruthy();
  });

  it('should have the router outlet', () => {
    expect(nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
