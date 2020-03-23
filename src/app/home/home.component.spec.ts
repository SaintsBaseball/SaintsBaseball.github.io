import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should have the saints logo', () => {
    const saintsLogoImage = nativeElement.querySelectorAll('img')[0];
    expect(saintsLogoImage.src.includes('saintsLogo.jpg')).toBeTrue();
    expect(saintsLogoImage.id).toBe('saints-logo');
  });

  it('should have the header title', () => {
    expect(homeComponent.title).toBe('Home of the NCBL Spring 2019 Champs!');
    expect(nativeElement.querySelector('h1').textContent).toBe(homeComponent.title);
  });
});
