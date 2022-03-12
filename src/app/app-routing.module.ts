import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpaBodyComponent} from "../spa/spa-body/spa-body.component";
import {RegisterReactiveFormComponent} from "./login/components/register-reactive-form/register-reactive-form.component";
import {PersonalAreaComponent} from "../spa/components/personal-area/personal-area.component";
import {LoginReactFormComponent} from "./login/components/login-react-form/login-react-form.component";

const routes: Routes = [
  {path: 'admin', loadChildren:()=> import('./login/login.module')
      .then(mod=>mod.LoginModule)},
  // {path: 'personal', component: PersonalAreaComponent},
  {path: '',   redirectTo: '', pathMatch: 'full' },
  {path: '**', component: SpaBodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
