import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FondCardsService } from '../../../personal/services/fond-cards.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'payments-transfers-wrapper',
    templateUrl: './payments-transfers-wrapper.component.html',
    styleUrls: ['./payments-transfers-wrapper.component.scss']
})
export class PaymentsTransfersWrapperComponent implements OnInit {
    constructor(
        private _router: Router,
        private _fondCardsService: FondCardsService,
    ) {
        this._router.navigate(['/personal/' + this._fondCardsService.id + '/transfer/choice']);
    }

    public ngOnInit(): void {
        console.log('wrapper');
    }
}
