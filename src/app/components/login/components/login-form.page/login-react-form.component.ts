import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CanDeactivate, Router } from '@angular/router';
import { IUser } from '../../../spa/interfaces/IUser.interface';
import { PeopleService } from '../../services/people.service';
import { GeneralService } from '../../../spa/services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { ExitAboutGuard } from '../../../spa/guards/exit.about.guard';
import { AlertWindowComponent } from '../../../alert-window/alert-window.component';
import { AlertifyServiceService } from '../../../../services/alertify-service.service';

@Component({
    selector: 'app-authorization-react-form',
    templateUrl: './login-react-form.component.html',
    styleUrls: ['./login-react-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginReactFormComponent implements OnInit {
    @ViewChild('btn')
    public btn!: ElementRef;

    @ViewChild('password')
    public password!: ElementRef;

    public login: FormGroup = new FormGroup({});


    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _peopleService: PeopleService,
        private _renderer: Renderer2,
        private _cookieService: CookieService,
        private _singletonService: GeneralService,
        private _alertifyServiceService: AlertifyServiceService,
    ) {
    }

    public onSubmit(): void {
        this._cookieService.delete('id');
        this._cookieService.set('mail', this.login.value.mail);
        this._cookieService.set('password', this.login.value.password);
        this._singletonService.loggedUser = this._peopleService.getLoginUser();

        this._singletonService.loggedUser.subscribe({
            next: (u: IUser) => {
                this._cookieService.set('id', u.id.toString());
                this._singletonService.setLoggedIn(true);
                this._alertifyServiceService.statusAlert = 'success';
                this._alertifyServiceService.subject$.next({
                    text: 'Successful login.',
                    status: 'success',
                });
                this._router.navigate(['personal', u.id, 'personal-main-page']);
            },
            complete: () => {
                this.login.reset();
            },
            error: (error: any) => {
                throw Error('You have entered non-existent data' + error);
            }
        });
    }

    public ngAfterViewInit(): void {
        this._peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
    }


    public ngOnInit(): void {
        this.createForm();
    }


    private createForm(): void {
        this.login = new FormGroup({
            mail: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

}
