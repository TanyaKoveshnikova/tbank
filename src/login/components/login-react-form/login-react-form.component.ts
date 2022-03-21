import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../../../spa/interfaces";
import {PeopleService} from "../../people.service";

@Component({
    selector: 'app-authorization-react-form',
    templateUrl: './login-react-form.component.html',
    styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit {
    public login: FormGroup = new FormGroup({});
    @ViewChild('btn')
    btn!: ElementRef;

    @ViewChild('password')
    password!: ElementRef;


    constructor(private _http: HttpClient, private _router: Router, private _peopleService: PeopleService,
                private _renderer: Renderer2) {
        this._createForm();
    }

    ngOnInit() {
    }


    private _createForm() {
        this.login = new FormGroup({
            mail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        })
    }

    public onSubmit() {
        this._peopleService.GetUser(this.login);
    }

    public ngAfterViewInit() {
        this._peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
    }
}
