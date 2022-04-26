import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../../../spa/interfaces/IUser';
import { PeopleService } from '../../services/people.service';
import { componentCanDeactivate } from '../../../spa/guards/exit.about.guard';
import { Observable } from 'rxjs';
import { SingletoneService } from '../../../spa/services/singletone.service';

@Component({
    selector: 'app-authorization-react-form',
    templateUrl: './login-react-form.component.html',
    styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit, OnDestroy {
    public login: FormGroup = new FormGroup({});
    @ViewChild('btn')
    public btn!: ElementRef;

    @ViewChild('password')
    public password!: ElementRef;


    constructor(private _http: HttpClient, private _router: Router, private _peopleService: PeopleService,
        private _renderer: Renderer2, private _singletone: SingletoneService) {
    }

    public onSubmit(): void {
        this._peopleService.getUser(this.login);
        this._singletone.setLoggedIn(true);
    }

    public ngAfterViewInit(): void {
        this._peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
    }


    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this.login.reset();
    }


    private createForm(): void {
        this.login = new FormGroup({
            mail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

}
