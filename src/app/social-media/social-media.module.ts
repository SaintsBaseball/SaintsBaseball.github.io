import { NgModule } from '@angular/core';
import { SocialMediaAccountComponent } from './components/social-media-account/social-media-account.component';
import { SocialMediaWrapperComponent } from './containers/social-media-wrapper/social-media-wrapper.component';
import { SocialMediaAccountInfoFactoryService } from './social-media-account-info-factory.service';

@NgModule({
  declarations: [
    SocialMediaAccountComponent,
    SocialMediaWrapperComponent
  ],
  exports: [
    SocialMediaWrapperComponent
  ],
  providers: [
    {
      provide: 'ISocialMediaAccountInfoFactoryService',
      useClass: SocialMediaAccountInfoFactoryService
    }
  ]
})
export class SocialMediaModule { }
