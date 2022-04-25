import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IUser} from '../spa/interfaces/IUser';
import { FondCardsService } from '../personal/fond-cards.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { SingletoneService } from '../spa/services/singletone.service';


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private static creatRandomNameCard(): string {
        const setWords: string[] = ['visa', 'master', 'classic', 'platinum', 'payCard', 'standard', 'maestro', 'muggle', 'wizard'];

        return (setWords[Math.floor(Math.random() * 9)] + ' ' + setWords[Math.floor(Math.random() * 9)]);
    }

    private static randomMoney(): string {
        return new Intl.NumberFormat('ru-RU').format(Math.round(Math.random() * 100000));
    }

    private static cardNumber(): string {
        return Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000) + ' '
            + Math.round(Math.random() * (10000 - 1000) + 1000) + ' ' + Math.round(Math.random() * (10000 - 1000) + 1000);
    }

    @ViewChild('password')
    public passwordInput!: ElementRef;
    public userWithId ?: IUser;
    // eslint-disable-next-line @typescript-eslint/typedef
    private _urlSignupUser = 'http://localhost:3000/signupUsers';
    private _newUser!: IUser;


    constructor(private _http: HttpClient, private _router: Router, private _fondCard: FondCardsService,
        private _auth: Auth, private _singletone: SingletoneService) {
    }

    public sendOnServer(registerForm: FormGroup): void {
        this._newUser = {
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
        };

        this.postUser(registerForm);
    }

    public getUser(login: FormGroup): void {
        this._http.get<IUser[]>(this._urlSignupUser)
            .subscribe((res: IUser[]) => {
                const user: IUser | undefined = res.find((a: IUser) => {
                    return a.mail === login.value.mail && a.password === login.value.password;
                });
                if (user) {
                    this._router.navigate(['/personal/' + user.id]);
                    this._singletone.setLoggedIn(true);
                    //login.reset();
                } else {
                    alert('user not found');
                }
            }, () => {
                alert('Something went wrong');
            });
    }

    public showPassword(btn: HTMLElement, input: Element): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        btn.onclick = () => {
            btn.classList.toggle('active');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
            } else {
                input.setAttribute('type', 'password');
            }
        };
    }


    private postUser(registerForm: FormGroup): void {
        this._http.post<IUser>(this._urlSignupUser, this._newUser)
            .subscribe(() => {
                alert('Signup Successful');
                registerForm.reset();
                this._router.navigate(['/admin/login']);
            }, () => {
                alert('Signup Unsuccessful. Something went wrong');
            });
    }
}
