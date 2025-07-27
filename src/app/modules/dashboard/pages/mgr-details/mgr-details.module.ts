import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgrRolloverButtonComponent } from './components/mgr-rollover-button/mgr-rollover-button.component';

@NgModule({
  declarations: [
    MgrRolloverButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MgrRolloverButtonComponent
  ]
})
export class MgrDetailsModule { }
