import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SponsorComponent } from './sponsor.component';

describe('SponsorComponent', () => {
  let sponsorComponent: SponsorComponent;
  let fixture: ComponentFixture<SponsorComponent>;
  let nativeElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorComponent);
    sponsorComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(sponsorComponent).toBeTruthy();
  });

  it('should have the title in the header', () => {
    expect(sponsorComponent.sponsor).toBe('Secure E-Waste Solutions');
    expect(sponsorComponent.title).toBe(`Sponsored by ${sponsorComponent.sponsor}`);
    expect(nativeElement.querySelector('h3').textContent).toBe(sponsorComponent.title);
    const imageSourceWithNoRelativePath = 'assets/sponsorLogo.jpg';
    expect(nativeElement.querySelector('img').src.includes(imageSourceWithNoRelativePath)).toBeTrue();
    expect(nativeElement.querySelector('img').alt).toBe(sponsorComponent.sponsor);
  });
});
