import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyComponent} from "./spa-body/spa-body.component";


@NgModule({
  declarations: [
    SpaBodyComponent,
  ],
  exports: [
    SpaBodyComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SpaModule { }
