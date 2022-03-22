import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyContainerComponent} from "./components/spa-body-container/spa-body-container.component";

import {AppRoutingModule} from "../app/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "../login/login.module";
import {FooterSpaComponent} from "./components/footer-spa/footer-spa.component";
import {SpaBodyComponent} from "./components/spa-body/spa-body.component";



@NgModule({
  declarations: [
    SpaBodyContainerComponent,
    SpaBodyComponent,
    FooterSpaComponent
  ],
  exports: [
    SpaBodyContainerComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: []
})
export class SpaModule { }
