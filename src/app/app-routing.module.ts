import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpaBodyComponent } from './childrens/spa/components/spa-body/spa-body.component';
import { AuthGuard } from './childrens/personal/guards/auth.guard';
import { HomeAfterAuthComponent } from './childrens/personal/components/home-after-auth/home-after-auth.component';


const routes: Routes = [
    {
        path: 'admin', loadChildren: () => import('./childrens/login/login.module')
            .then((mod: any) => mod.LoginModule)
    },
    {
        path: 'personal', loadChildren: () => import('./childrens/personal/personal.module')
            .then((mod: any)  => mod.PersonalModule)//,canActivate: [AuthGuard]
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
