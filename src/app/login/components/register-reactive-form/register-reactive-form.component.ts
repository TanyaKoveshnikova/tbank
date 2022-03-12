import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, Validator, FormBuilder} from "@angular/forms";
import {ConfirmedValidator} from "../../../../spa/providers/CustomValidators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.scss']
})
export class RegisterReactiveFormComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router ) {
    this._createForm()
  }

  ngOnInit() {
  }

  private _createForm() {
    this.registerForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        mail: ['', [Validators.required, Validators.email]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      })
  }

  get f() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    this.http.post<any>('http://localhost:3000/signupUsers', this.registerForm.value)
      .subscribe(res =>{
        alert('Signup Successful');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },err => {
        alert('Signup Unsuccessful. Something went wrong');
      })
  }
}
