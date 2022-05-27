import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleButtonComponent } from './components/middle-button/middle-button.component';


@NgModule({
    declarations: [
        MiddleButtonComponent,
    ],
    exports: [
        MiddleButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class GeneralComponentsModule {
}
