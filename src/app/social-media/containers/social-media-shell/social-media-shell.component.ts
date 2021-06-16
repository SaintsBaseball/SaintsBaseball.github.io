import { Component, Inject, OnInit } from '@angular/core';
import { ISocialMediaAccountInfo } from 'app/interfaces/i-social-media-account-info';
import { ISocialMediaAccountInfoFactoryService } from 'app/interfaces/i-social-media-account-info-factory-service';

@Component({
  selector: 'social-media-shell',
  templateUrl: './social-media-shell.component.html'
})
export class SocialMediaShellComponent implements OnInit {
  title: string = 'Follow us on Social Media';
  instagramAccountInfo: ISocialMediaAccountInfo;
  facebookAccountInfo: ISocialMediaAccountInfo;

  constructor(
    @Inject('ISocialMediaAccountInfoFactoryService') private socialMediaAccountInfoFactory: ISocialMediaAccountInfoFactoryService
  ) { }

  ngOnInit(): void {
    this.instagramAccountInfo = this.socialMediaAccountInfoFactory.getAccountInfo('instagram');
    this.facebookAccountInfo = this.socialMediaAccountInfoFactory.getAccountInfo('facebook');
  }
}
