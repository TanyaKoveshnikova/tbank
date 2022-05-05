import { Directive, ElementRef, HostListener } from '@angular/core';
import { Renderer } from '@angular/compiler-cli/ngcc/src/rendering/renderer';

@Directive({
    selector: '[hintHover]'
})
export class HintHostListenerDirective {

    constructor() {
        // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    @HostListener('mouseover')
    onMouseOver(): void {
        console.log('hostlist');
    }
}
