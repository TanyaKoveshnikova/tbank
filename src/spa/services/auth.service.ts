import { Injectable } from '@angular/core';
import {IUser} from "../interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  public register(){
  }

  public login(user: IUser){
    // this.http.post()
  }
}

