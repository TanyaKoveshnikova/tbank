import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IUser, savingsAccount} from "../../../spa/interfaces";
import {FondCardsService} from "../../fond-cards.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public user?: IUser;
    public savingsAccounts?: savingsAccount[];

    constructor(private _fondCardsService: FondCardsService, public activateRoute: ActivatedRoute, private router: Router,
                private _route: ActivatedRoute) {
        this._fondCardsService.getUserSubject.subscribe(e => this.user = e);
        this._fondCardsService.getSavAccSubject.subscribe(e => this.savingsAccounts = e);
        this.user = this._fondCardsService.userService;
        this.savingsAccounts = this._fondCardsService.savAcc;
    }

    ngOnInit() {
        this.savingsAccounts = this._fondCardsService.savAcc;
    }

    public createSavingsAcc() {
        this.router.navigate(['../main-page/createSavingsAccount'], {relativeTo: this._route});
    }

    public onAdd(): void {
        this._fondCardsService.getAllNecessaryAcc();
        this.savingsAccounts = this._fondCardsService.savAcc;
    }
}
