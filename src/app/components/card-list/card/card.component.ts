import { Component, Input, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() survey!: any;

  constructor() { }

  ngOnInit(): void {


  }




}
