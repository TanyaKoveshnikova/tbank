import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export function makeComfortableInputCard(controlName: string, matchingControlName: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
        const control:  AbstractControl= formGroup.controls[controlName];
        const matchingControl:  AbstractControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ makeComfortableInputCard: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
