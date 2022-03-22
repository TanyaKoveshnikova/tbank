import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeAfterAuthComponent} from "./components/home-after-auth/home-after-auth.component";
import {HistoryComponent} from "./components/history/history.component";
import {PaymentsTransfersComponent} from "./components/payments-transfers/payments-transfers.component";
import {MainPageComponent} from "./components/main-page/main-page.component";


const childrenRoutes:Routes =[
  { path: 'history', component: HistoryComponent},
  { path: 'transfer', component: PaymentsTransfersComponent},
  { path: 'page', component: MainPageComponent},
  {
    path: 'myArea', loadChildren: () => import('../personal-area/personal-area.module')
      .then(mod => mod.PersonalAreaModule)
  }
]

const routes: Routes = [
  {path: 'home/:id', component: HomeAfterAuthComponent},
  {path: 'home/:id', component: HomeAfterAuthComponent, children: childrenRoutes},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
