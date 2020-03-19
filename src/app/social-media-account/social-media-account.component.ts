import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'social-media-account',
  templateUrl: './social-media-account.component.html',
  styleUrls: ['./social-media-account.component.css']
})
export class SocialMediaAccountComponent implements OnInit {
  linkToAccount: string;
  linkTitle: string;
  imageSource: string;
  imageAlternate: string;

  @Input() socialMediaAccount: string;

  constructor() {

  }

  ngOnInit(): void {
    if (this.socialMediaAccount === 'instagram') {
      this.linkToAccount = 'https://www.instagram.com/saints.baseball/';
      this.linkTitle = 'Follow us on Instagram';
      this.imageSource = '../../assets/instagramLogo.png';
      this.imageAlternate = 'Instagram';
    } else {
      this.linkToAccount = 'https://www.facebook.com/SaintsBaseball760/';
      this.linkTitle = 'Like us on Facebook';
      this.imageSource = '../../assets/facebookLogo.png';
      this.imageAlternate = 'Facebook';
    }
  }
}
