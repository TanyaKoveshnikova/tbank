import {Component, OnInit} from '@angular/core';
import {FondCardsService} from "../../fond-cards.service";
import {cards, IUser} from "../../../spa/interfaces";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subject, switchMap} from "rxjs";

@Component({
    selector: 'personal-area',
    templateUrl: './home-auth.component.html',
    styleUrls: ['./home-auth.component.scss']
})
export class HomeAuthComponent implements OnInit {
    public user?: IUser;
    public id!: number;


    constructor(public peopleService: FondCardsService, public activateRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.getID();
        this.getUserParams();
        this.router.navigate(['/personal/home/' + this.id + '/page'])
    }

    private getID() {
        this.activateRoute.paramMap.pipe(
            switchMap(params => params.getAll('id'))
        )
            .subscribe(data => this.id = +data);
    }

    private getUserParams(): void {
        this.peopleService.getNeedUserParams()
            .pipe(
                map((user: IUser[]): IUser => {
                    return user.filter(u => u.id === this.id) [0];
                })
            )
            .subscribe(user => {
                this.peopleService.getUserSubject.next(user)
            })
    }
}
