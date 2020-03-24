import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaWrapperComponent } from './social-media-wrapper.component';

describe('SocialMediaWrapperComponent', () => {
  let socialMediaWrapperComponent: SocialMediaWrapperComponent;
  let fixture: ComponentFixture<SocialMediaWrapperComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaWrapperComponent);
    socialMediaWrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(socialMediaWrapperComponent).toBeTruthy();
  });

  it('should have the title', () => {
    expect(socialMediaWrapperComponent.title).toBe('Follow us on Social Media');
    expect(nativeElement.querySelector('h3').textContent).toBe(socialMediaWrapperComponent.title);
  });
});
