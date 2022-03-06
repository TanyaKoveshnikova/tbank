import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormControlName} from "@angular/forms";

@Component({
  selector: 'register-reactive-form',
  templateUrl: './register-reactive-form.component.html',
  styleUrls: ['./register-reactive-form.component.scss']
})
export class RegisterReactiveFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      mail: new FormControl('gfgf'),
      password: new FormControl('null'),
      confirmPassword: new FormControl('null'),
      name: new FormControl('null'),
      surname: new FormControl('null'),
      //mobile: new FormControl(null), - опциональное поле
    })
  }

  ngOnInit() {
  }

  private _createForm(){
    this.registerForm = new FormGroup({
      mail: new FormControl('gfgf'),
      password: new FormControl('null'),
      confirmPassword: new FormControl('null'),
      name: new FormControl('null'),
      surname: new FormControl('null'),
      //mobile: new FormControl(null), - опциональное поле
    })
  }

}
