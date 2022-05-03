import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'payments-payments-transfers',
    templateUrl: './payments-transfers.component.html',
    styleUrls: ['./payments-transfers.component.scss']
})
export class PaymentsTransfersComponent implements OnInit {

    constructor(private _breadcrumbService: BreadcrumbService,) {
        //
    }

    public ngOnInit(): void {
        this._breadcrumbService.set('@PaymentsAndTransfers', 'Payments And Transfers');
    }

}
