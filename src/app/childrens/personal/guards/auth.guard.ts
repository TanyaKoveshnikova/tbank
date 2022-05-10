import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PeopleService } from '../../login/services/people.service';
import { Observable } from 'rxjs';
import { SingletonService } from '../../spa/services/singleton.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _singletonService: SingletonService, private _router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._singletonService.isLoggedIn) {
            return true;
        } else {
            alert('Sign in.');
            this._router.navigate(['//']);

            return false;
        }
    }
}
