import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CheckClientCardService } from '../../../services/check-client-card.service';

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

    constructor(private _checkClientCardService: CheckClientCardService) {
        //
    }

    public ngOnInit(): void {

    }

    public clientCardOnChanged(): void {
        const value: number = this.clientCard.length;
        switch (value){
            case 4:
                this.clientCard += ' ';
                break;
            case 9:
                this.clientCard += ' ';
                break;
            case 14:
                this.clientCard += ' ';
                break;
        }
        // if (this.inputControl.value.length < 18) {
        //     if (this._countNumber === 4) {
        //         this._countNumber = 0;
        //         this.clientCard += ' ';
        //     }
        //     this._countNumber += 1;
        // }

        this._checkClientCardService.clientCardNumber = this.inputControl.value;
    }
}