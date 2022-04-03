import {FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces";

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmedValidator: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function CheckRepeatEmail(mail: string, http: HttpClient, urlSignupUser: string) {
    return (formGroup: FormGroup) => {
        http.get<any>(urlSignupUser)
            .subscribe(res => {
                const control = formGroup.controls[mail]
                const user = res.find((a: IUser) => {
                    return a.mail === control.value
                });
                if (!user) {
                    control.setErrors(null);
                } else {
                    control.setErrors({checkRepeatEmail: true});
                }
            }, err => {
                alert('Something went wrong')
            })

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
    }
}
