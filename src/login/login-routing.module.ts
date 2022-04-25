import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterReactiveFormComponent } from './components/register-form.page/register-reactive-form.component';
import { LoginReactFormComponent } from './components/login-form.page/login-react-form.component';
import { AuthGuard } from '../personal/providers/auth.guard';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';

const routes: Routes = [
    { path: 'register', component: RegisterReactiveFormComponent, canDeactivate: [ExitAboutGuard] },
    { path: 'login', component: LoginReactFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
