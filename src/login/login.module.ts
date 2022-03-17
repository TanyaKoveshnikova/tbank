import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LoginReactFormComponent} from "./components/login-react-form/login-react-form.component";
import {RegisterReactiveFormComponent} from "./components/register-reactive-form/register-reactive-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PeopleService} from "./people.service";


@NgModule({
  declarations: [
    LoginReactFormComponent,
    RegisterReactiveFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  providers: [PeopleService]
})
export class LoginModule {
}
