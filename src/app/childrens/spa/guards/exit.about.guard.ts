import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface componentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

export class ExitAboutGuard implements CanDeactivate<componentCanDeactivate> {

    public canDeactivate(component: componentCanDeactivate): Observable<boolean> | boolean {

        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
