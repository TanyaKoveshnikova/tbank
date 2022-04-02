export interface IUser {
    mail: string;
    password: string;
    name: string,
    surname: string,
    id: number,
    cards: Array<cards>;
}

export interface cards {
    cardName: string,
    RUB: string,
    cardNumber: string
}

// export interface ISavAcc {
//     id: number,
//     savingsAccount: savingsAccount[];
// }

export interface savingsAccount {
    name: string;
    endDate: Date;
    goalRUB: string;
    doneRUB: string;
    idCreator?: number;
}
