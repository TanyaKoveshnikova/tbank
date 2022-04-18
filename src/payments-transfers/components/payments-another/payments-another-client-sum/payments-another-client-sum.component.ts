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
    private _rubUser?: string;

    constructor(private _fondCardsService: FondCardsService, private _fb: FormBuilder, private _checkClientCardService: CheckClientCardService) {
        this.iUser = _fondCardsService.userService;
        this.clientCard = this._checkClientCardService.clientCardNumber;
        this.findClient = this._checkClientCardService.client;
    }

    public ngOnInit(): void {
        if (this.iUser) {
            this._rubUser = this.iUser.cards[0].RUB.replace(' ', '');
            this.activeCardMoney = parseInt(this._rubUser);
        }
        this.createForm();
    }

    public onClickCard(card: any): void {
        this._rubUser = card.target.value.replace(' ', '');
        this.activeCardMoney = parseInt(<string>this._rubUser);
    }

    public sendMoney(): void {
        const sumTransfer: number = this.form.controls['transferAmount'].value;
        // const moneyClient = this.findClient?.cards.find((card: cards) => {
        //найти клиентскую карту с номером, который мы передаем, забрать от туда количество денег ж прибавить ыsumtransfer, отослать, проверить на json
        // })
        // this._checkClientCardService.patchPlusSumClient()

        console.log(sumTransfer);
    }

    public get f(): { [p: string]: AbstractControl } {
        return this.form.controls;
    }

    private createForm(): void {
        this.form = this._fb.group({
                //нужно вложить числовое значение карты, которая выбрана сейчас
                transferAmount: new FormControl('', [Validators.required])
            },
            {
                validators: amountValidator('transferAmount', this.activeCardMoney),
            });
    }
}
