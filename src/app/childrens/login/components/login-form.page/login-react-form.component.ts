import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../../../spa/interfaces/IUser';
import { PeopleService } from '../../services/people.service';
import { componentCanDeactivate } from '../../../spa/guards/exit.about.guard';
import { Observable, Observer, Subscription } from 'rxjs';
import { SingletoneService } from '../../../spa/services/singletone.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-authorization-react-form',
    templateUrl: './login-react-form.component.html',
    styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit, OnDestroy {
    @ViewChild('btn')
    public btn!: ElementRef;

    @ViewChild('password')
    public password!: ElementRef;

    public login: FormGroup = new FormGroup({});
    private _subscribe!: Subscription;


    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _peopleService: PeopleService,
        private _renderer: Renderer2,
        private _cookieService: CookieService,
        private _singletoneService:SingletoneService,
    ) {
    }

    public onSubmit(): void {
        this._cookieService.set('mail', this.login.value.mail);
        this._subscribe = this._peopleService.getUser()
            .subscribe({
                next: (res: IUser[]) => {
                    const user: IUser | undefined = res.find((a: IUser) => {
                        return a.mail === this.login.value.mail && a.password === this.login.value.password;
                    });
                    if (user) {
                        this._singletoneService.loggedUser = user;
                        this._singletoneService.setLoggedIn(true);
                        this._router.navigate(['/personal/' + user.id]);
                    } else {
                        alert('user not found');
                    }
                }, error: () => {
                    console.log('Something went wrong');
                }, complete: () => {
                    this.login.reset();
                    // this._cookieService.set('loginUser', this._peopleService.loggedUser);
                }
            });

        this._singletoneService.setLoggedIn(true);
    }

    public ngAfterViewInit(): void {
        this._peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
    }


    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this._subscribe.unsubscribe();
    }

    private createForm(): void {
        this.login = new FormGroup({
            mail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

}
