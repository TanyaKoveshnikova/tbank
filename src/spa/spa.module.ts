import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpaBodyComponent} from "./spa-body/spa-body.component";
import {ChangeFormService} from "./services/change-form.service";
import {RegisterReactiveFormComponent} from "../app/login/components/register-reactive-form/register-reactive-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app/app-routing.module";
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { LoginReactFormComponent } from '../app/login/components/login-react-form/login-react-form.component';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "../app/login/login.module";


@NgModule({
  declarations: [
    SpaBodyComponent,
    RegisterReactiveFormComponent,
    PersonalAreaComponent,
    LoginReactFormComponent
  ],
  exports: [
    SpaBodyComponent,
    RegisterReactiveFormComponent,
    PersonalAreaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [ChangeFormService, AuthService]
})
export class SpaModule { }
