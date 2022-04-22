import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { PaymentsBetweenAccountsComponent } from '../payments-between-accounts/payments-between-accounts.component';
import { FondCardsService } from '../../../../personal/fond-cards.service';
import { cards, savingsAccount } from '../../../../spa/interfaces';
import { Observable, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { amountValidator } from '../../../validators/amountValidator';
import { CheckClientCardService } from '../../../check-client-card.service';

@Component({
    selector: 'app-filling-details',
    templateUrl: './filling-details.component.html',
    styleUrls: ['./filling-details.component.scss']
})
export class FillingDetailsComponent implements OnInit, OnDestroy {
    public savingAccounts$?: Observable<savingsAccount[]>;
    public date: Date | number = Date.now();
    public userCard?: cards;
    public reactiveForm: FormGroup = new FormGroup({});

    //выбранная карта для перевода на нее денег с основного счета
    public selectedValue?: savingsAccount;

    private _rubNumberUser!: number;


    constructor(private _paymBetAccComp: PaymentsBetweenAccountsComponent,
        private _router: Router, private _fondCardsService: FondCardsService,
        private _builder: FormBuilder, private _fb: FormBuilder, private _checkClientCardService: CheckClientCardService) {
        this._paymBetAccComp.toggleClass('filling');
        this.savingAccounts$ = _fondCardsService.getSavingsAccount();
        this.userCard = _fondCardsService.getFirstCardUser();
    }

    public ngOnDestroy(): void {
        this._paymBetAccComp.toggleClass('filling');
    }

    public ngOnInit(): void {
        this.createForm();
        if (this.userCard?.RUB) {
            this._rubNumberUser = this._checkClientCardService.transformMoneyInNumber(this.userCard?.RUB);
        }
    }

    public clickConfirmation(): void {
        console.log('clickConfirmation - done ' + this.selectedValue?.name);
        const valueMoney: number = this.f['sum'].value;
        if (this._rubNumberUser) {
            const endMoneyUser: number = this._rubNumberUser - valueMoney;
            this._checkClientCardService.patchMinusSumUser(endMoneyUser);
        }

        //реализовать добавление денег на накоп счет!

        console.log(this.f['sum'].value);
    }

    public get f(): { [p: string]: AbstractControl } {
        return this.reactiveForm.controls;
    }

    private createForm(): void {
        this.reactiveForm = this._fb.group({
                sum: new FormControl('', [Validators.required])
            },
            {
                validators: amountValidator('sum', this._rubNumberUser),
            });
    }
}
