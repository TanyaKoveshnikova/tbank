import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpaBodyRouterComponent} from "../spa/components/spa-body-router/spa-body-router.component";


const routes: Routes = [
    {
        path: 'admin', loadChildren: () => import('../login/login.module')
            .then(mod => mod.LoginModule)
    },
    {
        path: 'personal', loadChildren: () => import('../personal/personal.module')
            .then(mod => mod.PersonalModule)
    },
    {path: '', component: SpaBodyRouterComponent},
    {path: '**', component: SpaBodyRouterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
