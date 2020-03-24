import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryService } from './services/social-media-account-info-factory.service';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SidebarComponent,
    MainContentComponent,
    SponsorComponent,
    SocialMediaAccountComponent,
    HomeComponent,
    StatisticsComponent
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
