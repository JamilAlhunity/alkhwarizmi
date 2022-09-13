import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';
import { MatTabChangeEvent } from '@angular/material/tabs';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  surveys: Survey[] = [];

  selectedCardId!: number;

  dataToSend!: string;

  displayView: boolean = true;
  openFilter: boolean = true;

  currentTabLabel!: string;
  tabLabels: Array<string> = ['Published', 'Expired', 'Closed', 'All Surveys'];
  inputValue!: string;

  surveyStartDate!: string;
  surveyEndDate!: string;


  constructor(public dialog: MatDialog, public surveyService: SurveysService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((data: any) => {
      this.surveys = data[0];
      this.surveyService.setSurveys(this.surveys);

      for (let survey of this.surveys) {
        if (!survey.SurveyPeriods) {
          survey.SurveyPeriods = "[{\"ID\":24425,\"START_DATE\":\"2021-05-24T00:00:00\",\"END_DATE\":\"2022-07-31T00:00:00\"}]";
        }
        survey.SurveyPeriods = JSON.parse(survey.SurveyPeriods);
      }



    });
    this.surveyService.getSurveysData().subscribe((data: Survey[]) => {
      this.surveys = data;
      this.surveyService.filteringSurveys = this.surveys.filter(survey => {
        return survey.SURVEY_STATUS_EN === "Published";
      });
      this.surveyService.filteredSurveysSubject$.next(this.surveyService.filteringSurveys);
    });
    if (this.surveyService.isDark) {
      document.body.classList.add('dark-theme')
      console.log('ok')
    }
    if (this.surveyService.textSize) {
      document.body.classList.add('textSize')

    }

  }

  openDialog(): void {
    this.surveyService.getSurveysData().subscribe((data: Survey[]) => {
      this.surveys = data;
    });
    const currentSurvey = this.surveyService.getSurveyById(this.selectedCardId);

    const dialogRef = this.dialog.open(DialogComponent, {
      data: currentSurvey,
      width: '260px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      const condition = this.surveyService.language === 'en' ? /[\w ]{4,}$/.test(result) : /[ء-ي]{4,}$/.test(result);
      const surNameCondition = this.surveyService.language === 'en' ? 'SurveyNameEn' : 'SurveyNameAr';
      currentSurvey[surNameCondition] = condition ? result : currentSurvey[surNameCondition];
      this.dataToSend = currentSurvey[surNameCondition]
    });
  }

  selectedSurveyId(id: number) {
    this.selectedCardId = id;
  }

  onTabChange = (changeEvent: MatTabChangeEvent) => {
    const tabLabel = changeEvent?.tab.textLabel;

    this.surveyService.getSurveysData().subscribe((data: Survey[]) => this.surveys = data)
    if (changeEvent.index !== 3) { // 3 as in All Survey Option
      this.surveyService.filteringSurveys = this.surveys.filter((survey: Survey) => {

        return (survey.SURVEY_STATUS_EN === tabLabel) || (survey.SURVEY_STATUS_AR === tabLabel);
      });
      console.log(this.surveyService.filteringSurveys);


    } else {
      this.surveyService.filteringSurveys = [...this.surveys];
    }

    if (!this.inputValue) {
      this.surveyService.filteredSurveysSubject$.next(this.surveyService.filteringSurveys)
      if (this.surveyService.startDateFormatted && this.surveyService.endDateFormatted) {
        this.surveyService.datesFilter()
      }
    } else {
      this.searchFilter(this.inputValue)
    }
  }

  searchFilter(inputValue?: string) {
    if (this.surveyService.startDateFormatted && this.surveyService.endDateFormatted) {
      this.surveyService.datesFilter()
    }

    const inputFilter = this.surveyService.filteringSurveys.filter((survey: Survey) => {
      const surNameCondition = this.surveyService.language === 'en' ? survey.SurveyNameEn : survey.SurveyNameAr
      return (surNameCondition?.toLowerCase().trim()?.includes((inputValue!).toLowerCase().trim()))
    })

    this.surveyService.filteredSurveysSubject$.next(inputFilter)
  }

  switchTheme() {
    this.surveyService.isDark = !this.surveyService.isDark;
    if (this.surveyService.isDark) {

      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'true');

    } else {

      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'false');

    }
  }

  changeTextSize() {
    console.log('click');
    this.surveyService.textSize = !this.surveyService.textSize;
    if (this.surveyService.textSize) {
      document.body.classList.add('textSize');
      localStorage.setItem('textSize', 'true');
    } else {
      document.body.classList.remove('textSize');
      localStorage.setItem('textSize', 'false');
    }
  }

}


