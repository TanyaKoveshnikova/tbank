import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'payments-another-client',
    templateUrl: './payments-another-client.component.html',
    styleUrls: ['./payments-another-client.component.scss']
})
export class PaymentsAnotherClientComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(19)]);
    public clientCard?: any;
    // eslint-disable-next-line @typescript-eslint/typedef
    private _countNumber = 1;

    // eslint-disable-next-line @typescript-eslint/typedef
    private _lengthNumberCard = 0;

    constructor() {
        //
    }

    public ngOnInit(): void {

    }

    public clientCardOnChanged(): void {
        if (this._countNumber === 4) {
            this._countNumber = 0;

            if(this._lengthNumberCard <= 18) {
                this.clientCard += ' ';
            }
        }
        this._countNumber += 1;
        this._lengthNumberCard += 1;
    }

}
