import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WcsAngularModule } from 'wcs-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { NavComponent } from './common/components/nav/nav.component';
import { HomeComponent } from './home/view/home/home.component';
import { CreateCupComponent } from './cup/view/create-cup/create-cup.component';
import { SearchCupsComponent } from './cup/view/search-cups/search-cups.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { LiterPipe } from './common/pipe/liter.pipe';
import { BadgeComponent } from './common/components/badge/badge.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './common/components/delete/delete.component';
import { IndicatorComponent } from './home/components/indicator/indicator.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { StoreComponent } from './store/store.component';
import { CupState } from './store/cup/cup.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    CreateCupComponent,
    SearchCupsComponent,
    LiterPipe,
    BadgeComponent,
    DeleteComponent,
    IndicatorComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WcsAngularModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-full-width',
    }),
    NgxsModule.forRoot([CupState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd/MM/yyyy' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
