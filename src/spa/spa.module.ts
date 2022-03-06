import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyComponent} from "./spa-body/spa-body.component";
import {ChangeFormService} from "./services/change-form.service";
import {RegisterReactiveFormComponent} from "./register-reactive-form/register-reactive-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app/app-routing.module";


@NgModule({
  declarations: [
    SpaBodyComponent,
    RegisterReactiveFormComponent
  ],
  exports: [
    SpaBodyComponent,
    RegisterReactiveFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [ChangeFormService]
})
export class SpaModule { }
