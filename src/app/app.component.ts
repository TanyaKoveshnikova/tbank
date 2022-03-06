import {Component} from '@angular/core';
import {ChangeFormService, SpaConfigSettings, IIcons} from "../spa/services/change-form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tbank';
  //configSoc: SpaConfigSettings;

  constructor(private changeFormService: ChangeFormService) {
    // const config: SpaConfigSettings = {
    //   socialIcons: [
    //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
    //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
    //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'},
    //     {imageFile: 'src/assets/images/logo_blue.png', alt: 'Telegram', url: 'ggj####'}
    //   ]
    // }
    // this.configSoc = config
  }

}
