import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IUser, savingsAccount} from "../../../spa/interfaces";
import {FondCardsService} from "../../fond-cards.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";


@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public user?: IUser;
    // public savingsAccounts?: savingsAccount[];
    private subscriptions: Subscription[] = [];
    public savCardsObs?: Observable<savingsAccount[]>;

    constructor(private _fondCardsService: FondCardsService, public activateRoute: ActivatedRoute, private router: Router,
                private _route: ActivatedRoute) {
        let userSubscribe = this._fondCardsService.getUserSubject.subscribe(e => this.user = e);
        this.subscriptions.push(userSubscribe);
        // let saveAccSubscribe = this._fondCardsService.getSavAccSubject.subscribe(e => this.savingsAccounts = e);
        // this.subscriptions.push(saveAccSubscribe);
        this.user = this._fondCardsService.userService;
        // this.savingsAccounts = this._fondCardsService.savAcc;
    }

    ngOnInit() {
        this.savCardsObs = this._fondCardsService._getSavingsAccount()
    }

    ngOnDestroy() {
        this.subscriptions
            .forEach(s => s.unsubscribe());
    }


    public createSavingsAcc() {
        this.router.navigate(['../main-page/createSavingsAccount'], {relativeTo: this._route});
    }

    public onAdd(): void {
        this.savCardsObs = this._fondCardsService._getSavingsAccount()
    }
}
