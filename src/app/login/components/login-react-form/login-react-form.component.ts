import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorization-react-form',
  templateUrl: './login-react-form.component.html',
  styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit {
  public login: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private router: Router) {
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
    this.http.get<any>('http://localhost:3000/signupUsers')
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.mail === this.login.value.mail && a.password === this.login.value.password
        });
        if(user){
          alert('Login Success');
          this.login.reset();
          this.router.navigate(['/personal/' + user.id])
        } else{
          alert('user not found');
        }
      }, err =>{
        alert('Something went wrong')
      })
  }
}
