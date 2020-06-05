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
import { NavigationBarComponent } from './home/navigation-bar/navigation-bar.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { ShellComponent } from './home/shell/shell.component';
import { SponsorComponent } from './home/sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media/social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryService } from './social-media/social-media-account-info-factory.service';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { StatisticsTableComponent } from './statistics/components/statistics-table/statistics-table.component';
import { SocialMediaWrapperComponent } from './social-media/social-media-wrapper/social-media-wrapper.component';
import { InMemoryStatsDataService } from './data-services/in-memory-stats-data.service';
import { StatisticsService } from './statistics/statistics.service';
import { HttpRequestService } from './services/http-request.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SidebarComponent,
    ShellComponent,
    SponsorComponent,
    SocialMediaAccountComponent,
    WelcomeComponent,
    StatisticsTableComponent,
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
