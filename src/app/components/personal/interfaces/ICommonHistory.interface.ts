import { ICardView } from '../../../../libs/factory.history/interfaces/ICardView.interface';
import { ICommon } from '../../../../libs/factory.history/interfaces/ICommon.interface';
import { IBetweenAccount } from '../../../../libs/factory.history/interfaces/IBetweenAccount.interface';

export interface ICommonHistory extends ICommon, IBetweenAccount {
    'fromWhom': string,
    'transferAmount': string,
    'date': Date | number,
    'interactionWhichAccount': ICardView,
    'operationName': string,
    'id'?: number,
    'typeTransaction': string,
    'whatAccountName'?: string,
}

