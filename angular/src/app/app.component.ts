import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular';
  
  constructor(translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
  }
}
