import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterReactiveFormComponent} from "../login/components/register-reactive-form/register-reactive-form.component";
import {HomeAuthComponent} from "./components/home-auth/home-auth.component";

const routes: Routes = [
  {path: 'home/:id', component: HomeAuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
