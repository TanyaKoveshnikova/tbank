import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authorization-react-form',
  templateUrl: './login-react-form.component.html',
  styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit {
  public login: FormGroup = new FormGroup({});

  constructor() {
   this._createForm();
  }


  ngOnInit(): void {
  }

  private _createForm(){
    this.login = new FormGroup({
      mail: new FormControl('gfgf', [Validators.required, Validators.email]),
      password: new FormControl('null', [Validators.required, Validators.minLength(6)]),
    })
  }

  public onSubmit() {

  }

}
