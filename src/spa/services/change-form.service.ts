import {Injectable} from '@angular/core';

export interface IIcons {
  imageFile: string;
  url: string;
  alt: string;
}

export interface SpaConfigSettings {
  showUserControls?: boolean;
  socialIcons?: Array<IIcons>;
}

@Injectable({
  providedIn: 'root'
})
export class ChangeFormService {

  showUserControls = true;
  socialIcons = new Array<IIcons>()

  constructor() {
  }

  configure(settings: SpaConfigSettings): void{
    Object.assign(this, settings);
  }
}
