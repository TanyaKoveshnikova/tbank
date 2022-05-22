import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginReactFormComponent } from './components/login-form.page/login-react-form.component';
import { AuthGuard } from '../personal/guards/auth.guard';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { LoginRegisterFormComponent } from './components/login-register-form.page/login-register-form.component';

const routes: Routes = [
    { path: 'register', component: LoginRegisterFormComponent, canDeactivate: [ExitAboutGuard] },
    { path: 'login', component: LoginReactFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
