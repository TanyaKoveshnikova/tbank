import { ICommon } from './interfaces/ICommon';
import { ICardView } from './interfaces/ICardView';
import { ICard } from '../../spa/interfaces/ICard';
import { SendCardHistory } from './data/sendCardHistory';
import { IUser } from '../../spa/interfaces/IUser';
import { Injectable } from '@angular/core';
import { FromSomeone } from './types-actions/fromSomeone';
import { BetweenAccounts } from './types-actions/betweenAccounts';


@Injectable({
    providedIn: 'root',
})
export class FactoryCardHistory {
    private static formattingMoney(needFormatNumber: number): string {
        return new Intl.NumberFormat('ru-RU').format(needFormatNumber);
    }

    constructor(private _sendCardHistory: SendCardHistory) {
    }

    public createCard(type: string, user: IUser, transferAmount: number, client?: IUser, savAccName?: string): void {
        const moneyTransfer: string = FactoryCardHistory.formattingMoney(transferAmount);
        if (type === 'fromSomeone' && client) {
            const senderName: string = user.name + ' ' + user.surname;
            const createdClass: any = new FromSomeone(senderName, moneyTransfer, client.cards[0], client.id);
            const bodyRequest: any = createdClass.createForm();
            this._sendCardHistory.postFromSomeone(createdClass.urlMyHistory, bodyRequest);
        }

        if (type === 'betweenAccounts' && savAccName) {
            const createdClass: any = new BetweenAccounts(savAccName, moneyTransfer, user.cards[0], user.id);
            const bodyRequest: any = createdClass.createForm();
            this._sendCardHistory.postBetweenAccounts(createdClass.urlMyHistory, bodyRequest);
        }
    }
}


//todo:  сделать класс куда-то(когда отправляю(деньги списываются)
