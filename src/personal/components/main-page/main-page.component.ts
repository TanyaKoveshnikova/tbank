import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUser, savingsAccount } from '../../../spa/interfaces';
import { FondCardsService } from '../../fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';


@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public user?: IUser;
    public savCardsObs?: Observable<savingsAccount[]>;
    private _subscriptions: Subscription[] = [];

    constructor(private _fondCardsService: FondCardsService, private _router: Router,
        private _route: ActivatedRoute) {
        const userSubscribe: Subscription = this._fondCardsService.getUserSubject.subscribe((e: IUser) => this.user = e);
        this._subscriptions.push(userSubscribe);
        this.user = this._fondCardsService.userService;
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }

    public ngOnInit(): void {
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }

    public ngOnDestroy(): void {
        this._subscriptions
            .forEach((s: Subscription) => s.unsubscribe());
    }


    public createSavingsAcc(): void {
        this._router.navigate(['../main-page/createSavingsAccount'], { relativeTo: this._route });
        this.savCardsObs = this._fondCardsService.getSavingsAccount();
    }
}
