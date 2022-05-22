import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FondCardsService } from '../../services/fond-cards.service';
import { IUser } from '../../../spa/interfaces/IUser.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Subject, switchMap } from 'rxjs';
import { GeneralService } from '../../../spa/services/general.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PeopleService } from '../../../login/services/people.service';

@Component({
    selector: 'home-after-auth',
    templateUrl: './personal-home-after-auth.component.html',
    styleUrls: ['./personal-home-after-auth.component.scss']
})
export class PersonalHomeAfterAuthComponent implements OnInit {
    public id!: number;
    @ViewChild('burger')
    public burger!: ElementRef;

    @ViewChild('menu')
    public menu!: ElementRef;

    constructor(
        private _fondCardsService: FondCardsService,
        public activateRoute: ActivatedRoute,
    ) {
        this.getID();
    }

    public ngOnInit(): void {
        //
    }

    public openMenu(): void {
        this.burger.nativeElement.classList.toggle('active');
        this.menu.nativeElement.classList.toggle('active');
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
