import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {


  constructor(public surveyService: SurveysService, @Inject(MAT_DIALOG_DATA) public data: Survey, public dialogRef: MatDialogRef<DialogComponent>) { }

  surveyNameCondition: string | undefined = this.surveyService.language === 'en' ? this.data.SurveyNameEn : this.data.SurveyNameAr


}
