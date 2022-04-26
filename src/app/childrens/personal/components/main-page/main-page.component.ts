import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUser} from '../../../spa/interfaces/IUser';
import { FondCardsService } from '../../services/fond-cards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ISavingsAccount } from '../../../spa/interfaces/ISavingsAccount';


@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public user?: IUser;
    public savCardsObs?: Observable<ISavingsAccount[]>;
    // eslint-disable-next-line @typescript-eslint/typedef
    public loading = false;
    private _subscriptions: Subscription[] = [];

    constructor(private _fondCardsService: FondCardsService, private _router: Router,
        private _route: ActivatedRoute) {
        const userSubscribe: Subscription = this._fondCardsService.getUserSubject$.subscribe((e: IUser) => {
            this.user = e;
            this.loading = true;
        });
        this._subscriptions.push(userSubscribe);
    }

    public ngOnInit(): void {
        // this.loading = true;
        this._fondCardsService.ngOnInit();
        this.user = this._fondCardsService.userService;
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
