import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let welcomeComponent: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    welcomeComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(welcomeComponent).toBeTruthy();
  });

  it('should have the saints logo', () => {
    const saintsLogoImage = nativeElement.querySelectorAll('img')[0];
    expect(saintsLogoImage.src.includes('saintsLogo.jpg')).toBeTrue();
    expect(saintsLogoImage.id).toBe('saints-logo');
  });

  it('should have the header title', () => {
    expect(welcomeComponent.title).toBe('Home of the NCBL Spring 2019 Champs!');
    expect(nativeElement.querySelector('h1').textContent).toBe(welcomeComponent.title);
  });
  
  it('should have the image of the spring 2019 champs', () => {
    const championshipImage = nativeElement.querySelectorAll('img')[1];
    expect(championshipImage.src.includes('spring2019Champs.jpg')).toBeTrue();
  });
});
