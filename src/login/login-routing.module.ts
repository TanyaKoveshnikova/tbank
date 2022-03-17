import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterReactiveFormComponent} from "./components/register-reactive-form/register-reactive-form.component";
import {LoginReactFormComponent} from "./components/login-react-form/login-react-form.component";

const routes: Routes = [
  {path: 'register', component: RegisterReactiveFormComponent},
  {path: 'login', component: LoginReactFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
