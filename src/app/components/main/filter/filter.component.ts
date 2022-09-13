import { Component } from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  surveys: Survey[] = [];
  startDate!: string | null;
  endDate!: string | null;

  constructor(public surveyService: SurveysService, private pipe: DatePipe) { }


  getDates() {
    // this.surveyService.startDateFormatted = this.pipe.transform(this.startDate, "dd-MM-yyyy");
    // this.surveyService.endDateFormatted = this.pipe.transform(this.endDate, "dd-MM-yyyy");

    this.surveyService.startDateFormatted = moment(this.startDate).format('l');
    this.surveyService.endDateFormatted = moment(this.endDate).format('l');

    this.surveyService.datesFilter()
  }

  clearDates(event: Event) {
    this.surveyService.getSurveysData().subscribe((data: Survey[]) => this.surveys = data);

    event.stopPropagation();
    this.startDate = null;
    this.endDate = null;
    this.surveyService.startDateFormatted = null;
    this.surveyService.endDateFormatted = null;

    this.surveyService.filteredSurveysSubject$.next(this.surveyService.filteringSurveys);
  }

}







