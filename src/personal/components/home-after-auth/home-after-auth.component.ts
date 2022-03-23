import {Component, OnInit} from '@angular/core';
import {FondCardsService} from "../../fond-cards.service";
import {cards, IUser} from "../../../spa/interfaces";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subject, switchMap} from "rxjs";

@Component({
    selector: 'home-after-auth',
    templateUrl: './home-after-auth.component.html',
    styleUrls: ['./home-after-auth.component.scss']
})
export class HomeAfterAuthComponent implements OnInit {
    public user?: IUser;
    public id!: number;


    constructor(private _fondCardsService: FondCardsService, public activateRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.getID();
        this.router.navigate(['/personal/home/' + this.id + '/main-page'])
    }

    private getID() {
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        )
            .subscribe(data => this.id = +data);
        this._fondCardsService.id = this.id;
        this._fondCardsService.ngOnInit();
    }
}
