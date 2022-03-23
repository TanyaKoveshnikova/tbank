import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../spa/interfaces";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, Subject, switchMap} from "rxjs";

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
        this._createUsrService();
    }

    public getNeedUserParams(): Observable<Array<IUser>> {
        return this.http.get<IUser[]>(this.urlSignupUser);
    }

    private getUserParams(): Observable<any> {
        return this.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter(u => u.id === this.id)[0];
                })
            );
    }

    private _createUsrService() {
        this.getUserParams()
            .subscribe((user: IUser) => {
                this.userService = user;
                this.getUserSubject.next(user);
            })
    }

    private _postSavingsAcc(){
        this.getUserParams()
            
    }
}
