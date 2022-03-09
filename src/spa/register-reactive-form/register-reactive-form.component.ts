import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormControlName, Validators} from "@angular/forms";

@Component({
  selector: 'register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.scss']
})
export class RegisterReactiveFormComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});

  constructor() {
    this._createForm()
  }

  ngOnInit() {
  }

  private _createForm() {
    this.registerForm = new FormGroup({
      mail: new FormControl('gfgf', [Validators.required, Validators.email]),
      password: new FormControl('null', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('null', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('null', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('null', [Validators.required]),
      //mobile: new FormControl(null), - опциональное поле
    })
  }

  public onSubmit() {

  }

}
