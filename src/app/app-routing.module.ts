import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AunthetiatedComponent} from "./authenticated/aunthetiated.component";
import {HomeComponent} from "./home/home.component";
import {HomeAunthetiatedComponent} from "./home-aunthetiated/home-aunthetiated.component";

const routes: Routes = [
  {path: 'authenticated',component: AunthetiatedComponent,
  children:[
    {path: 'home',component: HomeAunthetiatedComponent}
  ]},
  {path: '',   redirectTo: '', pathMatch: 'full' },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
