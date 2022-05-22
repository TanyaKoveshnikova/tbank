import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IUser } from '../../spa/interfaces/IUser.interface';

export function amountValidator(controlName: string, cardMoney:number): ValidationErrors | null {
    return (formGroup: FormGroup) => {
        const control:  AbstractControl= formGroup.controls[controlName];
        if (control.errors && !control.errors['amountValidator']) {
            return;
        }
        if(Number(control.value) > cardMoney || control.value === 0){
            control.setErrors({ amountValidator: true });
        } else {
            control.setErrors(null);
        }
    };
}
