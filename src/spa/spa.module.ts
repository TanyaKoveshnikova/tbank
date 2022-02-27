import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyComponent} from "./spa-body/spa-body.component";
import {SpaFooterComponent} from "./spa-footer/spa-footer.component";
import {SpaHeaderComponent} from "./spa-header/spa-header.component";
import {SpaContentComponent} from "./spa-content/spa-content.component";



@NgModule({
  declarations: [
    SpaBodyComponent,
    SpaFooterComponent,
    SpaHeaderComponent,
    SpaContentComponent
  ],
  exports: [
    SpaBodyComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SpaModule { }
