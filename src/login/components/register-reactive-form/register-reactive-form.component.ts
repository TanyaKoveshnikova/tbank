import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ConfirmedValidator} from "../../../spa/providers/CustomValidators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../../../spa/interfaces";
import {PeopleService} from "../../people.service";
import {LoginReactFormComponent} from "../login-react-form/login-react-form.component";

@Component({
    selector: 'register-reactive-form',
    templateUrl: './register-reactive-form.component.html',
    styleUrls: ['./register-reactive-form.component.scss']
})
export class RegisterReactiveFormComponent implements OnInit {
    public registerForm: FormGroup = new FormGroup({});

    @ViewChild('btn')
    btn!: ElementRef;

    @ViewChild('password')
    password!: ElementRef;

    @ViewChild('btn2')
    btn2!: ElementRef;

    @ViewChild('confirmPassword')
    confirmPassword!: ElementRef;

    constructor(private http: HttpClient, private fb: FormBuilder, public peopleService: PeopleService) {
        this._createForm()
    }

    ngOnInit() {
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
                validator: ConfirmedValidator('password', 'confirmPassword')
            })
    }

    get f() {
        return this.registerForm.controls;
    }

    public onSubmit() {
        this.peopleService.sendOnServer(this.registerForm);
    }

    public ngAfterViewInit() {
        this.peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
        this.peopleService.showPassword(this.btn2.nativeElement, this.confirmPassword.nativeElement);
    }
}
