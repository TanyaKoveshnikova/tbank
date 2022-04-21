import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';
import { FondCardsService } from '../../../../personal/fond-cards.service';
import { cards, savingsAccount } from '../../../../spa/interfaces';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-filling-details',
    templateUrl: './filling-details.component.html',
    styleUrls: ['./filling-details.component.scss']
})
export class FillingDetailsComponent implements OnInit, OnDestroy {
    public savingAccounts$?: Observable<savingsAccount[]>;
    public date: Date | number = Date.now();
    public userCard?: cards;
    public reactiveForm?: FormGroup;

    //выбранная карта для перевода на нее денег с основного счета
    public selectedValue?: savingsAccount;


    constructor(private _paymBetAccComp: PaymentsBetweenAccountsComponent,
        private _router: Router, private _fondCardsService: FondCardsService,
        private _builder: FormBuilder) {
        this._paymBetAccComp.toggleClass('filling');
        this.savingAccounts$ = _fondCardsService.getSavingsAccount();
        this.userCard = _fondCardsService.getFirstCardUser();
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('filling');
    }

    public ngOnInit(): void {
        this.reactiveForm = this._builder.group({
            sum: [null, Validators.required]
        });
    }

    public clickConfirmation():void{
        console.log('clickConfirmation - done');
    }
}
