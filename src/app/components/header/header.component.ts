import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/surveys.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = 'Jamil Alhunity';
  initials: string = `${this.username[0]}${this.username[this.username.indexOf(' ') + 1]} `;

  constructor(public surveyService: SurveysService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.changeLang(localStorage.getItem('lang')!)
  }

  changeLang(lang: string) {
    this.surveyService.language = lang;
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    document.getElementsByTagName('html')[0].dir = lang === 'en' ? 'ltr' : 'rtl'
  }

}



