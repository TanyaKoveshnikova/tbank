import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUser} from '../../../spa/interfaces/IUser';
import { FondCardsService } from '../../services/fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ISavingsAccount } from '../../../spa/interfaces/ISavingsAccount';
import { PeopleService } from '../../../login/services/people.service';
import { SingletoneService } from '../../../spa/services/singletone.service';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
    selector: 'main-page',
    templateUrl: './personal-main-page.component.html',
    styleUrls: ['./personal-main-page.component.scss']
})
export class PersonalMainPageComponent implements OnInit, OnDestroy {
    public user?: IUser;
    public savCardsObs?: Observable<ISavingsAccount[]>;
    public loading: boolean = false;

    constructor(
        private _fondCardsService: FondCardsService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private  _singletoneService:SingletoneService,
        private _breadcrumbService: BreadcrumbService,
    ) {
        this.user = this._fondCardsService.userService;
        this.loading = true;
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@MainPage', 'Main Page');
        this._peopleService.getLoginUser();
        this._fondCardsService.ngOnInit();
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }

    public ngOnDestroy(): void {
        //
    }


    public createSavingsAcc(): void {
        this._router.navigate(['../personal-main-page/createSavingsAccount'], { relativeTo: this._route });
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }
}

//todo: доделать подгрузку карты при обновлении страницы
