import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginReactFormComponent } from './components/login-react-form/login-react-form.component';
import { RegisterReactiveFormComponent } from './components/register-reactive-form/register-reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleService } from './people.service';
import { ExitAboutGuard } from '../spa/providers/exit.about.guard';


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
    providers: [PeopleService, ExitAboutGuard]
})
export class LoginModule {
}

