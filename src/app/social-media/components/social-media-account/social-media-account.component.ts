import { Component, Input } from '@angular/core';
import { ISocialMediaAccountInfo } from '../../../interfaces/i-social-media-account-info';

@Component({
  selector: 'social-media-account',
  templateUrl: './social-media-account.component.html',
  styleUrls: ['./social-media-account.component.css']
})
export class SocialMediaAccountComponent {
  @Input() accountInfo: ISocialMediaAccountInfo;
}
