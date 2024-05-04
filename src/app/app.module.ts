import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ShowcaseComponent } from './showcase/showcase.component';
import { ButtonPrimaryDirective } from './directives/button-primary/button-primary.directive';
import { ButtonSmDirective } from './directives/button-sm/button-sm.directive';
import { ButtonSecondaryDirective } from './directives/button-secondary/button-secondary.directive';
import { TitleStrategy } from '@angular/router';
import { PageTitleStrategyService } from './services/page-title-strategy.service';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
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
