import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaBodyComponent } from './components/spa/components/spa-body/spa-body.component';
import { AuthGuard } from './components/personal/guards/auth.guard';
import { PersonalHomeAfterAuthComponent } from './components/personal/components/personal-home-after-auth/personal-home-after-auth.component';


const routes: Routes = [
    {
        path: 'admin', loadChildren: () => import('./components/login/login.module')
            .then((mod: any) => mod.LoginModule)
    },
    {
        path: 'personal',
        data: { breadcrumb: { skip: true } },
        loadChildren: () => import('./components/personal/personal.module')
            .then((mod: any) => mod.PersonalModule)//,canActivate: [AuthGuard]
    },
    { path: '', component: SpaBodyComponent },
    { path: '**', component: SpaBodyComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
