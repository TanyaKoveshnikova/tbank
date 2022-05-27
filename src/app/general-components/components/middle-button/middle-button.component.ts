import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'spa-middle-button',
    templateUrl: './middle-button.component.html',
    styleUrls: ['./middle-button.component.scss']
})
export class MiddleButtonComponent implements OnInit {
    public buttonText: string = <string>'';
    public width: string = <string>'1em';

    @Input()
    public isDisabled: boolean = <boolean>false;

    @Input()
    public set text(name: string) {
        this.buttonText = name;
    }

    public get name(): string {
        return this.buttonText;
    }

    @Input()
    public set setWidthStyle(width: string) {
        this.width = width;
    }

    public get getWidthStyle(): string {
        return this.width;
    }

    @Output()
    public btnClick = new EventEmitter();

    constructor() {
        //
    }

    public ngOnInit(): void {
        //
    }

    public onClick(): void {
        this.btnClick.emit();
    }

}
