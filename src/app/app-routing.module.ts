import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpaBodyComponent} from "../spa/components/spa-body/spa-body.component";


const routes: Routes = [
    {
        path: 'admin', loadChildren: () => import('../login/login.module')
            .then(mod => mod.LoginModule)
    },
    {
        path: 'personal', loadChildren: () => import('../personal/personal.module')
            .then(mod => mod.PersonalModule)
    },
    {path: '', component: SpaBodyComponent},
    {path: '**', component: SpaBodyComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
