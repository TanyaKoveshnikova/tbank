import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginReactFormComponent } from './components/login-form.page/login-react-form.component';
import { RegisterReactiveFormComponent } from './components/register-form.page/register-reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleService } from './people.service';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';
import { AuthGuard } from '../personal/providers/auth.guard';


@NgModule({
    declarations: [
        LoginReactFormComponent,
        RegisterReactiveFormComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LoginRoutingModule,
    ],
    providers: [
        PeopleService,
        ExitAboutGuard,
        AuthGuard,
    ]
})
export class LoginModule {
}

