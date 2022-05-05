import { ComponentRef, Directive, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { FondCardsService } from '../services/fond-cards.service';

@Directive({
    selector: '[hintHover]'
})
export class HintHostListenerDirective {

    constructor(private _fondCardsService:FondCardsService) {
        //
    }

    @HostListener('mouseover')
    onMouseOver(): void {
        this._fondCardsService.setMouseoverExplanation(true);
    }

    @HostListener('mouseout')
    onMouseOut(): void {
        this._fondCardsService.setMouseoverExplanation(false);
    }
}
