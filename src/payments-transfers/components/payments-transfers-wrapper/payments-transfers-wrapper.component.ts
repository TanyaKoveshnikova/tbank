import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FondCardsService } from '../../../personal/fond-cards.service';

@Component({
    selector: 'payments-transfers-wrapper',
    templateUrl: './payments-transfers-wrapper.component.html',
    styleUrls: ['./payments-transfers-wrapper.component.scss']
})
export class PaymentsTransfersWrapperComponent implements OnInit {
    public id!: number | undefined;

    constructor(private _router: Router, public activateRoute: ActivatedRoute, private _fondCardsService: FondCardsService) {
        this.id = this._fondCardsService.id;
    }

    public ngOnInit(): void {
        this._router.navigate(['/personal/' + this.id + '/transfer/choice']);
    }

    // private getID(): void {
    //     this.activateRoute.paramMap.pipe(
    //         switchMap((params: ParamMap) => params.getAll('id'))
    //     )
    //         .subscribe((data: string) => this.id = +data);
    //     this._fondCardsService.id = this.id;
    //     this._fondCardsService.ngOnInit();
    // }
}
