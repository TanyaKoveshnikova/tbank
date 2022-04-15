import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IUser } from '../../spa/interfaces';

export function amountValidator(cardMoney:number): ValidatorFn  {
    return (control: AbstractControl) => {
        if(control.value > cardMoney){
            return { amountValidator: true };
        } else {
            return null;
        }
    };
}
