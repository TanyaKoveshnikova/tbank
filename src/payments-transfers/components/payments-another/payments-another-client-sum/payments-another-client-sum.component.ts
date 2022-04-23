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

    constructor(private _fondCardsService: FondCardsService, private _fb: FormBuilder, private _checkClientCardService: CheckClientCardService) {
        this.iUser = _fondCardsService.userService;
        this.clientCard = this._checkClientCardService.clientCardNumber;
        this.findClient = this._checkClientCardService.client;
    }

    public ngOnInit(): void {
        if (this.iUser) {
            this.activeCardMoney = this._checkClientCardService.transformMoneyInNumber(this.iUser.cards[0].RUB);
        }
        this.createForm();
    }

    public onClickCard(card: any): void {
        this.activeCardMoney = this._checkClientCardService.transformMoneyInNumber(card.target.value);
    }

    public sendMoney(): void {
        const sumTransfer: number = this.form.controls['transferAmount'].value;
        this._checkClientCardService.transferAmount = sumTransfer;
        const cardClient: cards | undefined = this.findClient?.cards.find((card: cards) => {
            return card.cardNumber === this.clientCard;
        });
        if (cardClient && this.iUser) {
            const moneyOnCardUser: number = parseInt(this.iUser.cards[0].RUB.replace(' ', ''));
            const moneyOnCard: number = parseInt(cardClient.RUB.replace(' ', ''));
            const sumTransferDone: number = moneyOnCard + sumTransfer;
            const moneyMinusSum: number = moneyOnCardUser - sumTransfer;
            this._checkClientCardService.patchPlusSumClient(sumTransferDone, cardClient.cardName);
            this._checkClientCardService.patchMinusSumUser(moneyMinusSum);
        }

    }

    public get f(): { [p: string]: AbstractControl } {
        return this.form.controls;
    }

    private createForm(): void {
        this.form = this._fb.group(
            {
                transferAmount: new FormControl('', [Validators.required])
            },
            {
                validators: amountValidator('transferAmount', this.activeCardMoney),
            });
    }
}
