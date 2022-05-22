import { ICardView } from './ICardView.interface';


export interface ICommon {
    'fromWhom': string,
    'transferAmount': string,
    'date': Date | number,
    'interactionWhichAccount': ICardView,
    'operationName': string,
    'id'?: number,
    'typeTransaction': string,
}

