import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from './models/survey';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private apiUrl: string = 'https://mocki.io/v1/13665377-cd48-4e0b-a94a-9e2c9c0ab672';


  surveys: Survey[] = []
  surveySubject$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>([]);
  filteredSurveysSubject$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>([]);

  cardId!: number;

  startDateFormatted!: string | null;
  endDateFormatted!: string | null;
  filteringSurveys!: Survey[];

  surveyStartDate!: string;
  surveyEndDate!: string;


  isDark = localStorage.getItem('theme') ? (localStorage.getItem('theme') == 'true') : false;
  textSize = localStorage.getItem('textSize') ? (localStorage.getItem('textSize') == 'true') : false;

  language: string = 'en';


  constructor(private http: HttpClient, private toastr: ToastrService, private pipe: DatePipe) { }



  // public SaveDate(key: string, value: string) {
  //   localStorage.setItem(key, value);
  // }

  // public getDate(key: string) {
  //   return localStorage.getItem(key);
  // }


  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  setSurveys = (data: Survey[]) => {
    this.surveySubject$.next(data);
  }

  getSurveysData = (): Observable<Survey[]> => {
    return this.surveySubject$.asObservable()
  }

  getSurveyById(id: number): any {
    this.getSurveysData().subscribe((data: Survey[]) => {
      this.surveys = data;
    });
    for (let survey of this.surveys) {

      if (survey.TEMPLATE_ID === id) {
        return survey;
      }
    }
  }

  datesFilter() {
    console.log(this.startDateFormatted);

    if (moment(this.startDateFormatted).isAfter(this.endDateFormatted)) {
      return this.showErrorMassage()
    }

    const filterDates = this.filteringSurveys.filter((survey: Survey) => {

      // this.surveyStartDate = this.pipe.transform(survey.SurveyPeriods[0]["START_DATE" as any], "dd-MM-yyyy");
      // this.surveyEndDate = this.pipe.transform(survey.SurveyPeriods[0]["END_DATE" as any], "dd-MM-yyyy");
      this.surveyStartDate = moment(survey.SurveyPeriods[0]["START_DATE" as any]).format('l');
      this.surveyEndDate = moment(survey.SurveyPeriods[0]["END_DATE" as any]).format('l');

      return (moment(this.surveyStartDate).isAfter(this.startDateFormatted)) && (moment(this.surveyEndDate).isBefore(this.endDateFormatted))
    });

    this.filteredSurveysSubject$.next(filterDates);
  }

  showErrorMassage() {
    this.toastr.error("End Date Should Be After Start Date", "Date");
  }

}
