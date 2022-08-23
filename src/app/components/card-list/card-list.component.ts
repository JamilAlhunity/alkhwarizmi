import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
surveys: Survey[] = [];

  constructor(private surveyService: SurveysService) {
    this.surveyService.getSurveys().subscribe((data: any) =>{
      this.surveys = data[0]
      for(let survey of this.surveys) {
        if(!survey.SurveyPeriods){

         survey.SurveyPeriods = "[{\"ID\":24425,\"START_DATE\":\"2021-05-24T00:00:00\",\"END_DATE\":\"2022-07-31T00:00:00\"}]";
        };
        survey.SurveyPeriods = JSON.parse(survey.SurveyPeriods);
      }
    })
   }



  ngOnInit(): void {


}


}
