import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginReactFormComponent } from './components/login-form.page/login-react-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleService } from './services/people.service';
import { ExitAboutGuard } from '../spa/guards/exit.about.guard';
import { AuthGuard } from '../personal/guards/auth.guard';
import { LoginRegisterFormComponent } from './components/login-register-form.page/login-register-form.component';
import { AlertifyServiceService } from '../../services/alertify-service.service';


@NgModule({
    declarations: [
        LoginReactFormComponent,
        LoginRegisterFormComponent
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

