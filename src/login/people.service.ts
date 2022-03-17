import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser} from "../spa/interfaces";


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private urlSignupUser: string = 'http://localhost:3000/signupUsers';
  private newUser!: IUser;

  constructor(private http: HttpClient, private router: Router) {
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
        RUB: PeopleService.randomMoney()
      }]
    }

    this.postUser(registerForm);
  }

  private static creatRandomName(): string {
    const setWords = ['visa', 'master', 'classic', 'platinum', 'payCard', 'standard', 'maestro', 'muggle', 'wizard'];
    return setWords[Math.floor(Math.random() * 9)] + ' ' + setWords[Math.floor(Math.random() * 9)];
  }

  private static randomMoney(): number {
    return Math.round(Math.random() * 100000);
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
          alert('Login Success');
          login.reset();
          this.router.navigate(['/personal/home/' + user.id])
        } else {
          alert('user not found');
        }
        console.log(res)
      }, err => {
        alert('Something went wrong')
      })
  }
}



