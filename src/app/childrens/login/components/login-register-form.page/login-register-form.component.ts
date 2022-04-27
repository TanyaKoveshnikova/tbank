import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { checkRepeatEmail, confirmedValidator } from '../../../spa/utils/CustomValidators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../../../spa/interfaces/IUser';
import { PeopleService } from '../../services/people.service';
import { LoginReactFormComponent } from '../login-form.page/login-react-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Auth } from 'firebase/auth';
import { componentCanDeactivate } from '../../../spa/guards/exit.about.guard';
import { Observable } from 'rxjs';

@Component({
    selector: 'register-reactive-form',
    templateUrl: './login-register-form.component.html',
    styleUrls: ['./login-register-form.component.scss']
})
export class LoginRegisterFormComponent implements OnInit, componentCanDeactivate {
    public registerForm: FormGroup = new FormGroup({});
    private _saved = false;
    private urlSignupUser = 'http://localhost:3000/signupUsers';

    @ViewChild('btn')
        btn!: ElementRef;

    @ViewChild('password')
        password!: ElementRef;

    @ViewChild('btn2')
        btn2!: ElementRef;

    @ViewChild('confirmPassword')
        confirmPassword!: ElementRef;

    constructor(private http: HttpClient, private fb: FormBuilder, public peopleService: PeopleService,
        private auth: AngularFireModule) {
        this._createForm();
    }

    ngOnInit() {
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (!this._saved) {
            return confirm('Вы хотите покинуть страницу?');
        } else {
            return true;
        }
    }

    private _createForm() {
        this.registerForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            mail: ['', [Validators.required, Validators.email]],
        },
        {
            validators: [confirmedValidator('password', 'confirmPassword'),
                checkRepeatEmail('mail', this.http, this.urlSignupUser)]
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    public onSubmit() {
        //this.auth.signInWithEmailAndPassword()
        this.peopleService.sendOnServer(this.registerForm);
        this._saved = true;
    }

    public ngAfterViewInit() {
        this.peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
        this.peopleService.showPassword(this.btn2.nativeElement, this.confirmPassword.nativeElement);
    }
}
