import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PeopleService } from '../../login/services/people.service';
import { Observable } from 'rxjs';
import { GeneralService } from '../../spa/services/general.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _singletonService: GeneralService,
        private _router: Router,
        private _cookieService: CookieService
    ) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const id: string = this._cookieService.get('id');
        if (next.parent && next.parent.params['id'] && next.parent.params['id'] !== id) {
            this._router.navigate(['admin', 'login']);

            return false;
        }

        return true;
    }
}
