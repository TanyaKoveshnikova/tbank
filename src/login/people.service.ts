import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser} from "../spa/interfaces";
import {Subject} from "rxjs";
import {FondCardsService} from "../personal/fond-cards.service";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private urlSignupUser: string = 'http://localhost:3000/signupUsers';
    private newUser!: IUser;
    public userWithId ?: IUser;
    @ViewChild('password') passwordInput!: ElementRef;

    constructor(private http: HttpClient, private router: Router, private fondCard: FondCardsService) {
    }

    public sendOnServer(registerForm: FormGroup) {
        this.newUser = {
            mail: registerForm.value.mail,
            password: registerForm.value.password,
            name: registerForm.value.name,
            surname: registerForm.value.surname,
            id: registerForm.value.id,
            cards: [{
                cardName: PeopleService.creatRandomName(),
                RUB: PeopleService.randomMoney(),
                cardNumber: PeopleService.cardNumber(),
            }]
        }

        this.postUser(registerForm);
    }

    private static creatRandomName(): string {
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



