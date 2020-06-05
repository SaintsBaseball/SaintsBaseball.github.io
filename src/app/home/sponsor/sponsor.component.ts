import { Component } from '@angular/core';

@Component({
  selector: 'sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent {
  title: string = 'Sponsored by Secure E-Waste Solutions';
  sponsor: string = 'Secure E-Waste Solutions';

  constructor() { }

}
