import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../../../spa/interfaces";
import {PeopleService} from "../../people.service";

@Component({
  selector: 'app-authorization-react-form',
  templateUrl: './login-react-form.component.html',
  styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit {
  public login: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private router: Router, private peopleService: PeopleService) {
    this._createForm();
  }

  ngOnInit() {
    this.peopleService.showPassword();
  }

  private _createForm() {
    this.login = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public onSubmit() {
    this.peopleService.GetUser(this.login);
  }

}
