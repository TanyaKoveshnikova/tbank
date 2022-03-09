import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpaBodyComponent} from "../spa/spa-body/spa-body.component";
import {RegisterReactiveFormComponent} from "../spa/register-reactive-form/register-reactive-form.component";
import {PersonalAreaComponent} from "../spa/personal-area/personal-area.component";
import {LoginReactFormComponent} from "../spa/login-react-form/login-react-form.component";

const routes: Routes = [
  {path: 'register', component: RegisterReactiveFormComponent},
  {path: 'personal', component: PersonalAreaComponent},
  {path: 'authorization', component: LoginReactFormComponent},
  {path: '',   redirectTo: '', pathMatch: 'full' },
  {path: '**', component: SpaBodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
