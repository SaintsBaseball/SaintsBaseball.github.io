import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'social-media-account',
  templateUrl: './social-media-account.component.html',
  styleUrls: ['./social-media-account.component.css']
})
export class SocialMediaAccountComponent implements OnInit {
  accountInfo;
  private accountToInfo = {
    'instagram': {
      linkToAccount: 'https://www.instagram.com/saints.baseball/',
      linkTitle: 'Follow us on Instagram',
      imageSource: '../../assets/instagramLogo.png',
      imageAlternate: 'Instagram'
    },
    'facebook': {
      linkToAccount: 'https://www.facebook.com/SaintsBaseball760/',
      linkTitle: 'Like us on Facebook',
      imageSource: '../../assets/facebookLogo.png',
      imageAlternate: 'Facebook'
    }
  }

  @Input() socialMediaAccount: string;

  constructor() {

  }

  ngOnInit(): void {
    this.accountInfo = this.accountToInfo[this.socialMediaAccount];
  }
}
