import { AbstractControl, ValidatorFn } from '@angular/forms';

export function amountValidator(amountMoney: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        console.log(control.value);
        console.log(amountMoney);
        if ((control.value > amountMoney || control.value === 0)) {
            return { 'amountValidator': true };
        }

        return null;
    };
}
