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
import { SponsorComponent } from './sponsor/sponsor.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InMemoryDataService } from './in-memory-data-service/in-memory-data.service';
import { HttpRequestService } from './services/http-request.service';
import { AppEffects } from './state/app.effects';
import { reducer } from './state/app.reducer';
import { StatisticsService } from './services/statistics.service';
import { SocialMediaModule } from './social-media/social-media.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
    SponsorComponent,
    WelcomeComponent,
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
    }),
    SocialMediaModule,
    NavigationModule
  ],
  providers: [
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
