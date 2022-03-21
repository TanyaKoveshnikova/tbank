import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../spa/interfaces";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FondCardsService implements OnInit {
  private urlSignupUser: string = 'http://localhost:3000/signupUsers';
  public id?: number;
  public userService?: IUser;
  public getUserSubject: Subject<IUser> = new Subject<IUser>();


  constructor(private http: HttpClient, public activateRoute: ActivatedRoute) {
  }

  ngOnInit() {

  }

  public getID() {
    this.activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data => this.id = +data);
  }

  public getNeedUserParams(): Observable<Array<IUser>> {
    return this.http.get<IUser[]>(this.urlSignupUser);
  }
}
