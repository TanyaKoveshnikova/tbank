import { SendCardHistory } from './data/sendCardHistory';
import { IUser } from '../../app/components/spa/interfaces/IUser.interface';
import { Injectable } from '@angular/core';
import { FromSomeone } from './types-actions/fromSomeone';
import { BetweenAccounts } from './types-actions/betweenAccounts';
import { Withdrawal } from './types-actions/withdrawal';
import { ICard } from '../../app/components/spa/interfaces/ICard.interface';
import { ICommon } from './interfaces/ICommon.interface';


@Injectable({
    providedIn: 'root',
})
export class FactoryCardHistory {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    constructor(private _sendCardHistory: SendCardHistory) {
    }

    public createCard(type: string, user: IUser, transferAmount: number, card: ICard, client?: IUser, savAccName?: string): void {
        const moneyTransfer: string = FactoryCardHistory.formattingMoney(transferAmount);
        if (type === 'fromSomeone' && client) {
            const senderName: string = user.name + ' ' + user.surname;
            const createdClass: FromSomeone = new FromSomeone(senderName, moneyTransfer, card, client.id);
            const bodyRequest: ICommon = createdClass.createForm();
            this._sendCardHistory.postFromSomeone(createdClass.urlMyHistory, bodyRequest);
        }

        if (type === 'betweenAccounts' && savAccName) {
            const createdClass: BetweenAccounts = new BetweenAccounts(savAccName, moneyTransfer, card, user.id);
            const bodyRequest: ICommon = createdClass.createForm();
            this._sendCardHistory.postBetweenAccounts(createdClass.urlMyHistory, bodyRequest);
        }

        if (type === 'withdrawal' && client) {
            const clientName: string = client?.name + ' ' + client?.surname;
            const createdClass: Withdrawal = new Withdrawal(clientName, moneyTransfer, card, user.id);
            const bodyRequest: ICommon = createdClass.createForm();
            this._sendCardHistory.postWithdrawal(createdClass.urlMyHistory, bodyRequest);
        }
    }
}

