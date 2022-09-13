import { Component, Inject, OnInit } from '@angular/core';
import { SurveysService } from './surveys.service';
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public surveyService: SurveysService) { }
  ngOnInit(): void {


  }
}
