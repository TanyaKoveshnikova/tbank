import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[status]'
})
export class StatusDirective {
    @Input('statusValue')
        statusElement: any;

    constructor(private _element: ElementRef) {
        console.log(this.statusElement);
        if(this.statusElement === 'success'){
            this._element.nativeElement.style.color = 'darkgreen';
            this._element.nativeElement.style.background = 'white';
            console.log('csljk');
        }

        if(this.statusElement === 'error'){
            this._element.nativeElement.style.color = 'blue';
            this._element.nativeElement.style.background = 'black';
        }
    }

    private changeViewAlertWindow(): void {
        if(this.statusElement === 'success'){
            this._element.nativeElement.style.color = 'darkgreen';
            this._element.nativeElement.style.background = 'white';
            console.log('csljk');
        }

        if(this.statusElement === 'error'){
            this._element.nativeElement.style.color = 'blue';
            this._element.nativeElement.style.background = 'black';
        }
    }
}
