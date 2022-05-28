import { forwardRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INotificationOptions } from '../components/spa/interfaces/INotificationOptions.interface';
import { AlertifyServiceService } from './alertify-service.service';

@Injectable({
    providedIn: 'root',
    useClass: forwardRef( () => AlertifyServiceService ) // Default implementation.
})
export abstract class AbstractAlertifyService {
    public abstract makeNewAlert(): Subject<INotificationOptions>;
}
