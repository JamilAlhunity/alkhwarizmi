import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SurveysService } from 'src/app/surveys.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() survey!: any;
  @Input() selectedCardId!: number;
  @Output() cardSelectedId = new EventEmitter<{ id: number }>();

  constructor(public surveyService: SurveysService) { }

  onCardSelected() {

    if (this.selectedCardId === this.survey.TEMPLATE_ID) {
      this.selectedCardId = 0;
    } else {
      this.selectedCardId = this.survey.TEMPLATE_ID;
      this.cardSelectedId = this.survey.TEMPLATE_ID;
      this.cardSelectedId.emit({ id: this.selectedCardId })
    }
  }
}

