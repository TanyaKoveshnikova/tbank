import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../spa/interfaces";
import {FondCardsService} from "../../fond-cards.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public user?: IUser;

    constructor(private _fondCardsService: FondCardsService, public activateRoute: ActivatedRoute, private router: Router,
                private _route: ActivatedRoute) {
        this._fondCardsService.getUserSubject.subscribe(e => this.user = e);
        this.user = this._fondCardsService.userService;
    }

    ngOnInit() {
    }

    public createSavingsAcc() {
        this.router.navigate(['../main-page/createSavingsAccount'], {relativeTo: this._route});
    }
}
