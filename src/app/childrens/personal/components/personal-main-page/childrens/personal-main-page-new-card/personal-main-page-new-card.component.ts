import { ChangeDetectionStrategy, Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-personal-main-page-new-card',
    templateUrl: './personal-main-page-new-card.component.html',
    styleUrls: ['./personal-main-page-new-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalMainPageNewCardComponent implements OnInit {
    public arrayNumberImg: number[] = [];

    constructor(
        private _renderer: Renderer2,
        private _el: ElementRef
    ) {
        //
    }

    public ngOnInit(): void {
        let i: number = 0;
        while (i < 4) {
            this.arrayNumberImg.push(this.randomNumber());
            i++;
        }
    }

    public randomNumber(): number {
        return Math.floor(Math.random() * (123 - 1 + 1)) + 1;
    }

    public toggleClass(idCard: string): void {

    }
}
