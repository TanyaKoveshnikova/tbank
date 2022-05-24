import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { checkRepeatEmail, confirmedValidator } from '../../../spa/utils/CustomValidators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../../../spa/interfaces/IUser.interface';
import { PeopleService } from '../../services/people.service';
import { LoginReactFormComponent } from '../login-form.page/login-react-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Auth } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { ExitAboutGuard } from '../../../spa/guards/exit.about.guard';

@Component({
    selector: 'register-reactive-form',
    templateUrl: './login-register-form.component.html',
    styleUrls: ['./login-register-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegisterFormComponent implements OnInit, ExitAboutGuard {
    public registerForm: FormGroup = new FormGroup({});
    private _urlSignupUser = 'http://localhost:3000/signupUsers';

    @ViewChild('btn')
    public btn!: ElementRef;

    @ViewChild('password')
    public password!: ElementRef;

    @ViewChild('btn2')
    public btn2!: ElementRef;

    @ViewChild('confirmPassword')
    public confirmPassword!: ElementRef;

    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        public peopleService: PeopleService,
    ) {
        this.createForm();
    }

    public ngOnInit(): void {
        //
    }

    public get f(): { [key: string]: AbstractControl; } {
        return this.registerForm.controls;
    }

    public onSubmit(): void {
        this.peopleService.sendOnServer(this.registerForm);
    }

    public ngAfterViewInit(): void {
        this.peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
        this.peopleService.showPassword(this.btn2.nativeElement, this.confirmPassword.nativeElement);
    }

    public canDeactivate(): boolean | Observable<boolean> {
        if (this.registerForm.dirty && this.registerForm.invalid) {
            return confirm('Do you want to leave the page?');
        } else {
            return true;
        }
    }

    private createForm(): void {
        this.registerForm = this._fb.group(
            {
                password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g')]],
                confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g')]],
                name: ['', [Validators.required]],
                surname: ['', [Validators.required]],
                mail: ['', [Validators.required, Validators.email]],
            },
            {
                validators: [confirmedValidator('password', 'confirmPassword'),
                    checkRepeatEmail('mail', this._http, this._urlSignupUser)]
            });
    }
}
