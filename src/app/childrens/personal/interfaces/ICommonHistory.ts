import { ICardView } from '../../../../libs/factory.history/interfaces/ICardView';
import { ICommon } from '../../../../libs/factory.history/interfaces/ICommon';
import { IBetweenAccount } from '../../../../libs/factory.history/interfaces/IBetweenAccount';

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

