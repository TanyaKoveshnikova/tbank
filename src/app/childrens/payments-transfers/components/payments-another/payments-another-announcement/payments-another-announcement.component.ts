import { Component, OnInit } from '@angular/core';
import { CheckClientCardService } from '../../../services/check-client-card.service';
import { IUser } from '../../../../spa/interfaces/IUser';

@Component({
    selector: 'app-payments-announcement',
    templateUrl: './payments-another-announcement.component.html',
    styleUrls: ['./payments-another-announcement.component.scss']
})
export class PaymentsAnotherAnnouncementComponent implements OnInit {
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
