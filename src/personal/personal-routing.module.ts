import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeAuthComponent} from "./components/home-auth/home-auth.component";
import {HistoryComponent} from "./components/history/history.component";
import {PaymentsTransfersComponent} from "./components/payments-transfers/payments-transfers.component";


const childrenRoutes:Routes =[
  { path: 'history', component: HistoryComponent},
  { path: 'transfer', component: PaymentsTransfersComponent},
  {
    path: 'myArea', loadChildren: () => import('../personal-area/personal-area.module')
      .then(mod => mod.PersonalAreaModule)
  }
]

const routes: Routes = [
  {path: 'home/:id', component: HomeAuthComponent, children: childrenRoutes},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
