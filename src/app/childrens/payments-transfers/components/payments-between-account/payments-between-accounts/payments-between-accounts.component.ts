import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'payments-another-accounts',
    templateUrl: './payments-between-accounts.component.html',
    styleUrls: ['./payments-between-accounts.component.scss']
})
export class PaymentsBetweenAccountsComponent implements OnInit {

    constructor(private _router: Router, private _route: ActivatedRoute) {
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
