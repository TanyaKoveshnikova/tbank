import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../spa/interfaces/IUser.interface';
import { FondCardsService } from '../../personal/services/fond-cards.service';
import { Auth } from '@angular/fire/auth';
import { GeneralService } from '../../spa/services/general.service';
import { filter, find, Observable, pipe, switchMap, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ICard } from '../../spa/interfaces/ICard.interface';


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    public static cardNumber(): string {
        return Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000) + ' '
            + Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000);
    }

    @ViewChild('password')
    public passwordInput!: ElementRef;
    private _urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private _urlCreateCard: string = 'http://localhost:3000/cardsUsers';


    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _fondCard: FondCardsService,
        private _auth: Auth,
        private _cookieService: CookieService,
        private _singletonService: GeneralService,
    ) {
    }


    public sendOnServer(registerForm: FormGroup): void {
        const newUser: IUser = {
            mail: registerForm.value.mail,
            password: registerForm.value.password,
            name: registerForm.value.name,
            surname: registerForm.value.surname,
            id: registerForm.value.id,
        };

        let id: number;

        this.getUser()
            .subscribe({
                next: (users: IUser[]) => {
                    id = users[users.length - 1].id + 1;
                },
                complete: () => {
                    const firstCard: ICard = {
                        cardName: this.creatRandomNameCard(),
                        RUB: this.randomMoney(),
                        cardNumber: PeopleService.cardNumber(),
                        idCreator: id,
                    };

                    this.postCardUser(firstCard)
                        .subscribe();
                }
            });

        this.postUser(newUser)
            .subscribe({
                next: () => {
                    alert('Signup Successful');
                    //todo: перекинуть создание модального окна успешной регистрации
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

    public postCardUser(card: ICard): Observable<ICard> {
        return this._http.post<ICard>(this._urlCreateCard, card);
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
                        this._singletonService.setLoggedIn(true);
                        this._cookieService.delete('mail');
                        this._cookieService.delete('password');

                        return fondUser;
                    }
                }),
            );
    }


    public getLoginUserUpdate(): Observable<IUser> {
        const id: string = this._cookieService.get('id');

        return this.getUser()
            .pipe(
                switchMap((users: IUser[]) => {
                    const fondUser: IUser[] = users.filter((user: IUser) => {
                        return user.id.toString() === id;
                    });
                    if (fondUser.length === 0) {
                        throw new Error('Not founded user');
                    } else {
                        this._singletonService.setLoggedIn(true);

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
}
