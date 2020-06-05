import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
import { SocialMediaWrapperComponent } from './social-media-wrapper/social-media-wrapper.component';
import { InMemoryStatsDataService } from './data-services/in-memory-stats-data.service';
import { StatisticsService } from './services/statistics.service';
import { HttpRequestService } from './services/http-request.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SidebarComponent,
    MainContentComponent,
    SponsorComponent,
    SocialMediaAccountComponent,
    HomeComponent,
    StatisticsComponent,
    SocialMediaWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryStatsDataService),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Saints Baseball',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    {
      provide: 'ISocialMediaAccountInfoFactoryService',
      useClass: SocialMediaAccountInfoFactoryService
    },
    {
      provide: 'IStatisticsService',
      useClass: StatisticsService
    },
    {
      provide: 'IRequestService',
      useClass: HttpRequestService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
