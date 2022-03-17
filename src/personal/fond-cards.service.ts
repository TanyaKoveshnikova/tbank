import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../spa/interfaces";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FondCardsService implements OnInit {
  private urlSignupUser: string = 'http://localhost:3000/signupUsers';
  public needUser!: IUser | undefined;
  private id: number;


  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.findUserId();
  }

  public getNeedUserParams() {
    return this.needUser;
  }


  public findUserId() {
    this.http.get<IUser[]>(this.urlSignupUser)
      .subscribe(res => {
        this.needUser = res.find((a: IUser) => {
          return a.id === this.id;
        });
        console.log(this.needUser);
      }, err => {
        alert('Something went wrong')
      })
  }
}
