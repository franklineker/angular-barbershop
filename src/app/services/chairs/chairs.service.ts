import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chair } from 'src/app/models/chair.model';

@Injectable({
  providedIn: 'root'
})
export class ChairsService {

  baseUrl = "http://localhost:8080/chairs"

  constructor(
    private http: HttpClient
  ) { }

  findChairs(): Observable<Chair[]> {
    return this.http.get<Chair[]>(this.baseUrl)
  }
}
