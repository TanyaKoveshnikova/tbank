import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeAuthComponent} from "./components/home-auth/home-auth.component";
import {PersonalRoutingModule} from './personal-routing.module'


@NgModule({
  declarations: [
    HomeAuthComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule {
}
