import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  surveys: Survey[] = [];
  selectedId!: number;
  @Output() selectedSurveyId = new EventEmitter<{ id: number }>();

  constructor(public surveyService: SurveysService) {
  }


  ngOnInit(): void {

    this.surveyService.filteredSurveysSubject$.subscribe((data: Survey[]) => this.surveys = data);
    this.surveyService.setSurveys(this.surveys)

  }


  cardSelectedId(id: number) {
    this.selectedId = id;
    this.selectedSurveyId.emit({ id: this.selectedId });

  }


}

