import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser, savingsAccount} from "../spa/interfaces";
import {FondCardsService} from "../personal/fond-cards.service";
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _loggedInStatus = false;
    private urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private _urlSavingAcc: string = 'http://localhost:3000/savingsAcc';
    private newUser!: IUser;
    public userWithId ?: IUser;
    @ViewChild('password') passwordInput!: ElementRef;

    private setLoggedIn(value: boolean) {
        this._loggedInStatus = value;
    }

    get isLoggedIn() {
        return this._loggedInStatus;
    }

    constructor(private http: HttpClient, private router: Router, private fondCard: FondCardsService,
                private _auth: Auth) {
    }

    public sendOnServer(registerForm: FormGroup) {
        this.newUser = {
            mail: registerForm.value.mail,
            password: registerForm.value.password,
            name: registerForm.value.name,
            surname: registerForm.value.surname,
            id: registerForm.value.id,
            cards: [{
                cardName: PeopleService.creatRandomNameCard(),
                RUB: PeopleService.randomMoney(),
                cardNumber: PeopleService.cardNumber(),
            }]
        }
        // this._newSavingAcc = {
        //     id: registerForm.value.id,
        //     savingsAccount: [],
        // }
        // from(signInWithEmailAndPassword(this._auth, this.newUser.mail, this.newUser.password)).subscribe(() => {
        //     console.log('gfdsd');
        // })
        this.postUser(registerForm);
    }

    private static creatRandomNameCard(): string {
        const setWords = ['visa', 'master', 'classic', 'platinum', 'payCard', 'standard', 'maestro', 'muggle', 'wizard'];
        return (setWords[Math.floor(Math.random() * 9)] + ' ' + setWords[Math.floor(Math.random() * 9)]);
    }

    private static randomMoney(): string {
        return new Intl.NumberFormat('ru-RU').format(Math.round(Math.random() * 100000));
    }

    private static cardNumber(): string {
        return Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000) + ' '
            + Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000);
    }

    private postUser(registerForm: FormGroup) {
        // this.http.post<ISavAcc>(this._urlSavingAcc, this._newSavingAcc)
        //     .subscribe(res => {
        //         registerForm.reset();
        //     });
        this.http.post<IUser>(this.urlSignupUser, this.newUser)
            .subscribe(res => {
                alert('Signup Successful');
                registerForm.reset();
                this.router.navigate(['/admin/login']);
            }, err => {
                alert('Signup Unsuccessful. Something went wrong');
            });

    }

    public GetUser(login: FormGroup) {
        this.http.get<IUser[]>(this.urlSignupUser)
            .subscribe(res => {
                const user = res.find((a: IUser) => {
                    return a.mail === login.value.mail && a.password === login.value.password
                });
                if (user) {
                    this.setLoggedIn(true);
                    this.router.navigate(['/personal/home/' + user.id]);
                    login.reset();
                } else {
                    alert('user not found');
                }
            }, err => {
                alert('Something went wrong')
            })
    }

    public showPassword(btn: HTMLElement, input: Element) {
        btn.onclick = () => {
            btn.classList.toggle('active');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
            } else {
                input.setAttribute('type', 'password');
            }
        }
    }
}



