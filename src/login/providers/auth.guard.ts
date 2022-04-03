import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {PeopleService} from "../people.service";
import {Observable} from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _peopleService: PeopleService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('im guard')
        return this._peopleService.isLoggedIn;
    }
}
