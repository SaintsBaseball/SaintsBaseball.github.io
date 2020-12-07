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
import { SponsorComponent } from './sponsor/sponsor.component';
import { SocialMediaAccountComponent } from './social-media/social-media-account/social-media-account.component';
import { SocialMediaAccountInfoFactoryService } from './social-media/social-media-account-info-factory.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialMediaWrapperComponent } from './social-media/social-media-wrapper/social-media-wrapper.component';
import { InMemoryDataService } from './in-memory-data-service/in-memory-data.service';
import { HttpRequestService } from './services/http-request.service';
import { AppEffects } from './state/app.effects';
import { reducer } from './state/app.reducer';
import { StatisticsService } from './statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SidebarComponent,
    SponsorComponent,
    SocialMediaAccountComponent,
    WelcomeComponent,
    SocialMediaWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    StoreModule.forRoot({
      appState: reducer
    }),
    EffectsModule.forRoot([AppEffects]),
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
      provide: 'IRequestService',
      useClass: HttpRequestService
    },
    {
      provide: 'IStatisticsService',
      useClass: StatisticsService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
