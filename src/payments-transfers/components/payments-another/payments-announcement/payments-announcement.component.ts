import { Component, OnInit } from '@angular/core';
import { CheckClientCardService } from '../../../check-client-card.service';
import { IUser } from '../../../../spa/interfaces';

@Component({
    selector: 'app-payments-announcement',
    templateUrl: './payments-announcement.component.html',
    styleUrls: ['./payments-announcement.component.scss']
})
export class PaymentsAnnouncementComponent implements OnInit {
    public sumTransfer!: string;
    public client!: IUser | undefined;

    constructor(private _checkClientCardService:CheckClientCardService) {
        this.sumTransfer = _checkClientCardService.getTransferAmount();
        this.client = _checkClientCardService.client;
    }

    public ngOnInit(): void {
        //
    }

}
