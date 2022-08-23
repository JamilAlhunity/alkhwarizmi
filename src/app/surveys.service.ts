import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from './models/survey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
private apiUrl: string = 'https://mocki.io/v1/1f40e514-cb25-4a02-8cda-b1276ed60e67';
  constructor(private http: HttpClient) { }

 getSurveys(): Observable<Survey[]> {
  return this.http.get<Survey[]>(this.apiUrl);
}
}
