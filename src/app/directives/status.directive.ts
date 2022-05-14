import { Directive, ElementRef, Input } from '@angular/core';
import { AlertifyServiceService } from '../services/alertify-service.service';

@Directive({
    selector: '[status]'
})
export class StatusDirective {

    constructor(private _element: ElementRef, private _alertifyServiceService: AlertifyServiceService) {
        this.changeViewAlertWindow();
    }

    private changeViewAlertWindow(): void {
        if (this._alertifyServiceService.statusAlert === 'success') {
            this._element.nativeElement.style.background = '#082f06';
        }
    }
}
