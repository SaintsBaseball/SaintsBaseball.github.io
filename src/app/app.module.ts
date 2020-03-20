import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryService } from './social-media-account-info-factory.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SidebarComponent,
    MainContentComponent,
    SponsorComponent,
    SocialMediaAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'ISocialMediaAccountInfoFactory',
      useClass: SocialMediaAccountInfoFactoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
