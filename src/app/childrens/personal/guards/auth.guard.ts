import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PeopleService } from '../../login/services/people.service';
import { Observable } from 'rxjs';
import { SingletoneService } from '../../spa/services/singletone.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _singletone: SingletoneService, private _router: Router) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._singletone.isLoggedIn) {
            return true;
        } else {
            this._router.navigate(['//']);

            return false;
        }
    }
}
