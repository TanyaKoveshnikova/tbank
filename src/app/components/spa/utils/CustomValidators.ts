import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser.interface';

export function confirmedValidator(controlName: string, matchingControlName: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
        const control:  AbstractControl= formGroup.controls[controlName];
        const matchingControl:  AbstractControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function checkRepeatEmail(mail: string, http: HttpClient, urlSignupUser: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
        http.get<any>(urlSignupUser)
            .subscribe((res: any) => {
                const control:  AbstractControl = formGroup.controls[mail];
                const user: any = res.find((a: IUser) => {
                    return a.mail === control.value;
                });
                if (!user) {
                    control.setErrors(null);
                } else {
                    control.setErrors({ checkRepeatEmail: true });
                }
            }, () => {
                alert('Something went wrong');
            });

        //     const control = formGroup.controls[controlName];
        //     const matchingControl = formGroup.controls[matchingControlName];
        //     if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        //         return;
        //     }
        //     if (control.value !== matchingControl.value) {
        //         matchingControl.setErrors({confirmedValidator: true});
        //     } else {
        //         matchingControl.setErrors(null);
        //     }
        // }
    };
}
