import { Component, OnInit, Input, Inject } from '@angular/core';
import { ISocialMediaAccountInfo } from '../interfaces/i-social-media-account-info';
import { ISocialMediaAccountInfoFactory } from '../interfaces/i-social-media-account-info-factory';

@Component({
  selector: 'social-media-account',
  templateUrl: './social-media-account.component.html',
  styleUrls: ['./social-media-account.component.css']
})
export class SocialMediaAccountComponent implements OnInit {
  accountInfo: ISocialMediaAccountInfo;

  @Input() account: string;

  constructor(@Inject('ISocialMediaAccountInfoFactory') private socialMediaAccountInfoFactory: ISocialMediaAccountInfoFactory) {

  }

  ngOnInit(): void {
    this.accountInfo = this.socialMediaAccountInfoFactory.create(this.account);
  }
}
