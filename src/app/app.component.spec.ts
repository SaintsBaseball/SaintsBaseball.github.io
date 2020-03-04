import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavigationBarComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  }));

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should render the navigation bar', () => {
    expect(nativeElement.querySelector('navigation-bar')).toBeTruthy();
  });
});
