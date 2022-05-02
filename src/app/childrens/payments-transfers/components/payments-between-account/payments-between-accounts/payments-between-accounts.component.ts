import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'payments-another-accounts',
    templateUrl: './payments-between-accounts.component.html',
    styleUrls: ['./payments-between-accounts.component.scss']
})
export class PaymentsBetweenAccountsComponent implements OnInit {

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _breadcrumbService: BreadcrumbService,
    ) {
        this._breadcrumbService.set('@BetweenAccount', 'Between Account');
        this._router.navigate(['fillingDetails'], { relativeTo: _route });
    }

    public ngOnInit(): void {
        //
    }

    public toggleClass(idElem: string): void {
        const element: HTMLElement | null = document.getElementById(idElem);
        if (element) {
            element.classList.toggle('linkActive');
        }
    }

}
