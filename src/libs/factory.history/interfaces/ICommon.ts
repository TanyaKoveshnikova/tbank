import { ICardView } from './ICardView';


export interface ICommon {
    'fromWhom': string,
    'transferAmount': string,
    'date': Date | number,
    'interactionWhichAccount': ICardView,
    'operationName': string,
    'id'?: number,
}

//todo: сделать  'operationName'?: string, в каждом классе автоматически прикрепляется нужная
