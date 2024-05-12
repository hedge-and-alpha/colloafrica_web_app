import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { TitleStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { ButtonPrimaryDirective } from './directives/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from './directives/button-secondary/button-secondary.directive';
import { ButtonSmDirective } from './directives/button-sm/button-sm.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageTitleStrategyService } from './services/page-title-strategy.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSmDirective,
    ModalComponent,
  ],
  providers: [{ provide: TitleStrategy, useClass: PageTitleStrategyService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
