import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ButtonPrimaryDirective } from './directives/button-primary/button-primary.directive';
import { ButtonSmDirective } from './directives/button-sm/button-sm.directive';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ShowcaseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonPrimaryDirective,
    ButtonSmDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
