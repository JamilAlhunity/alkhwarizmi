import { Component, ViewChild, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Survey } from 'src/app/models/survey';
import { SurveysService } from 'src/app/surveys.service';
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit, AfterViewInit {
  surveys: Survey[] = [];

  @Output() selectedRowId = new EventEmitter<{ id: number }>();


  displayedColumns: string[] = ['SurveyName', 'START_DATE', 'END_DATE', 'SurveyPeriods'];
  dataSource!: MatTableDataSource<Survey>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public surveyService: SurveysService) { }

  ngOnInit(): void {
    this.surveyService.filteredSurveysSubject$.subscribe((data: Survey[]) => {

      this.surveys = data
      this.dataSource = new MatTableDataSource(this.surveys);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // this.surveyService.filteredSurveysInputSubject$.subscribe((data: Survey[]) => {
    //   this.surveys = data;
    //   this.dataSource = new MatTableDataSource(this.surveys);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });

  }
  ngAfterViewInit(): void {


  }

  onRowSelected(id: number) {
    this.selectedRowId.emit({ id });
  }


}
