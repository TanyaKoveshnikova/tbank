import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpaBodyComponent} from "../spa/spa-body/spa-body.component";
import {RegisterReactiveFormComponent} from "../spa/register-reactive-form/register-reactive-form.component";

const routes: Routes = [
  {path: 'register', component: RegisterReactiveFormComponent},
  {path: '',   redirectTo: '', pathMatch: 'full' },
  {path: '**', component: SpaBodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
