import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { TitleStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonPrimaryDirective } from './directives/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from './directives/button-secondary/button-secondary.directive';
import { ButtonSmDirective } from './directives/button-sm/button-sm.directive';
import { ErrorPageComponent } from './modules/dashboard/components/error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CapitalizeFirstPipe } from './pipes/capitalize-first/capitalize-first.pipe';
import { PageTitleStrategyService } from './services/page-title-strategy.service';


import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [AppComponent, AlertComponent, PageNotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSmDirective,
    ErrorPageComponent,
    LoaderComponent,
    ModalComponent,
    CapitalizeFirstPipe,
  ],
  providers: [
    { provide: TitleStrategy, useClass: PageTitleStrategyService },
    // { provide: ErrorHandler, useClass: DashboardErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
