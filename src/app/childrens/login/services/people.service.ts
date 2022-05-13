import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../spa/interfaces/IUser';
import { FondCardsService } from '../../personal/services/fond-cards.service';
import { Auth } from '@angular/fire/auth';
import { SingletonService } from '../../spa/services/singleton.service';
import { filter, find, Observable, pipe, switchMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    @ViewChild('password')
    public passwordInput!: ElementRef;
    private _urlSignupUser: string = 'http://localhost:3000/signupUsers';


    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _fondCard: FondCardsService,
        private _auth: Auth,
        private _cookieService: CookieService,
        private _singletoneService: SingletonService,
    ) {
    }

    public sendOnServer(registerForm: FormGroup): void {
        const newUser: IUser = {
            mail: registerForm.value.mail,
            password: registerForm.value.password,
            name: registerForm.value.name,
            surname: registerForm.value.surname,
            id: registerForm.value.id,
            cards: [{
                cardName: this.creatRandomNameCard(),
                RUB: this.randomMoney(),
                cardNumber: this.cardNumber(),
            }]
        };

        this.postUser(newUser)
            .subscribe({
                next: () => {
                    alert('Signup Successful');
                    this._router.navigate(['admin', 'login']);
                },
                error: () => {
                    console.log('Signup Unsuccessful. Something went wrong');
                },
                complete: () => {
                    registerForm.reset();
                }
            });
    }

    public getUser(): Observable<IUser[]> {
        return this._http.get<IUser[]>(this._urlSignupUser);
    }

    //для получение обновленных данных юзера

    public getLoginUser(): Observable<IUser> {
        const mail: string = this._cookieService.get('mail');
        const password: string = this._cookieService.get('password');

        return this.getUser()
            .pipe(
                switchMap((users: IUser[]) => {
                    const fondUser: IUser[] = users.filter((user: IUser) => {
                        return user.mail === mail && user.password === password;
                    });
                    if (fondUser.length === 0) {
                       throw new Error('Not founded user');
                    } else {
                        return fondUser;
                    }
                }),
            );
    }


    public showPassword(btn: HTMLElement, input: Element): void {
        btn.onclick = (): void => {
            btn.classList.toggle('active');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
            } else {
                input.setAttribute('type', 'password');
            }
        };
    }

    private postUser(newUser: IUser): Observable<IUser> {
        return this._http.post<IUser>(this._urlSignupUser, newUser);
    }

    private creatRandomNameCard(): string {
        const setWords: string[] = ['visa', 'master', 'classic', 'platinum', 'payCard', 'standard', 'maestro', 'muggle', 'wizard'];

        return (setWords[Math.floor(Math.random() * 9)] + ' ' + setWords[Math.floor(Math.random() * 9)]);
    }

    private randomMoney(): string {
        return new Intl.NumberFormat('ru-RU').format(Math.round(Math.random() * 100000));
    }

    private cardNumber(): string {
        return Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000) + ' '
            + Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000);
    }
}
