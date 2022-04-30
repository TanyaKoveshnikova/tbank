import { Component, OnInit } from '@angular/core';
import { FondCardsService } from '../../services/fond-cards.service';
import { IUser } from '../../../spa/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Subject, switchMap } from 'rxjs';
import { SingletoneService } from '../../../spa/services/singletone.service';

@Component({
    selector: 'home-after-auth',
    templateUrl: './personal-home-after-auth.component.html',
    styleUrls: ['./personal-home-after-auth.component.scss']
})
export class PersonalHomeAfterAuthComponent implements OnInit {
    public user?: IUser;
    public id!: number;


    constructor(
        private _fondCardsService: FondCardsService,
        public activateRoute: ActivatedRoute,
        private _router: Router,
        private _singletoneService: SingletoneService,
    ) {
    }

    public ngOnInit(): void {
        this.getID();
        this._router.navigate(['/personal/' + this.id + '/personal-main-page']);
    }

    private getID(): void {
        this.activateRoute.paramMap.pipe(
            switchMap((params: ParamMap) => params.getAll('id'))
        )
            .subscribe((data: string) => this.id = +data);
        this._fondCardsService.id = this.id;
        this._fondCardsService.ngOnInit();
    }
}
