import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { amountValidator } from '../../../validators/amountValidator';
import { FondCardsService } from '../../../../personal/fond-cards.service';
import { cards, IUser } from '../../../../spa/interfaces';
import { CheckClientCardService } from '../../../check-client-card.service';
import { checkRepeatEmail, confirmedValidator } from '../../../../spa/providers/CustomValidators';

@Component({
    selector: 'payments-another-client-sum',
    templateUrl: './payments-another-client-sum.component.html',
    styleUrls: ['./payments-another-client-sum.component.scss']
})
export class PaymentsAnotherClientSumComponent implements OnInit {
    public iUser!: IUser | undefined;
    public activeCardMoney!: number;
    public form: FormGroup = new FormGroup({});
    public clientCard: string | undefined;
    public findClient: IUser | undefined;

    constructor(private _fondCardsService: FondCardsService, private fb: FormBuilder, private _checkClientCardService: CheckClientCardService) {
        this.iUser = _fondCardsService.userService;
        this.createForm();
        this.clientCard = this._checkClientCardService.clientCardNumber;
        this.findClient = this.findClient = this._checkClientCardService.client;
    }

    public ngOnInit(): void {
        //
    }

    //
    // public get activeCardMoney(): any {
    //     // const countryId: any = this.form.controls['transferAmount'].value;
    //     // const strRUB: number = parseInt(countryId.RUB.replace(' ', ''));
    //     // // this.activeCardMoney = strRUB;
    //     // console.log(this.activeCardMoney);
    //     //
    //     // return strRUB;
    // }

    public onClickCard(card: any): void {
        const strRUB: string = card.target.value.replace(' ', '');
        this.activeCardMoney = parseInt(strRUB);
    }

    public sendMoney(): void {
        console.log('CLLICK ME!');
        const sumTransfer: number = this.form.controls['transferAmount'].value;
        console.log(sumTransfer);
    }

    public get f():  {[p: string]: AbstractControl} {
        return this.form.controls;
    }

    private createForm(): void {
        this.form = this.fb.group({
            //нужно вложить числовое значение карты, которая выбрана сейчас
            transferAmount: new FormControl('', [Validators.required])
        },
        {
            validators: amountValidator('transferAmount', this.activeCardMoney),
        });
    }
}
