import { NgModule } from '@angular/core';
import { SocialMediaAccountComponent } from './components/social-media-account/social-media-account.component';
import { SocialMediaShellComponent } from './containers/social-media-shell/social-media-shell.component';
import { SocialMediaAccountInfoFactoryService } from './social-media-account-info-factory.service';

@NgModule({
  declarations: [
    SocialMediaAccountComponent,
    SocialMediaShellComponent
  ],
  exports: [
    SocialMediaShellComponent
  ],
  providers: [
    {
      provide: 'ISocialMediaAccountInfoFactoryService',
      useClass: SocialMediaAccountInfoFactoryService
    }
  ]
})
export class SocialMediaModule { }
