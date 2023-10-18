import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Barber } from 'src/app/models/barber.model';

@Injectable({
  providedIn: 'root',
})
export class BarbersService {
  baseUrl = 'http://localhost:9000/barbers';
  createOrUpdateResponse!: any;
  barberToDelete!: Barber;
  data!: any;

  token = '' + this.tokenService.getAccessToken();
  headers_object = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  httpOptions = { headers: this.headers_object };

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getBarbers(): Observable<Barber[]> {
    console.log(this.httpOptions);
    return this.http.get<Barber[]>(`${this.baseUrl}`);
  }

  createBarber(barber: Barber): Observable<Barber> {
    return this.http.post<Barber>(`${this.baseUrl}/save`, barber);
  }

  setBarberToDelete(barber: Barber): void {
    this.barberToDelete = barber;
  }

  getBarberToDelete(): Barber {
    return this.barberToDelete;
  }

  uploadImage(file: File): Observable<FormData> {
    const formData = new FormData();
    formData.append('file', file);

    const id = this.createOrUpdateResponse.id;

    return this.http.put<FormData>(
      `${this.baseUrl}/updatePicture/${id}`,
      formData
    );
  }

  update(id: String, barber: Barber): Observable<Barber> {
    return this.http.put<Barber>(`${this.baseUrl}/update/${id}`, barber);
  }

  delete(id: String): Observable<Barber> {
    return this.http.delete<Barber>(`${this.baseUrl}/delete/${id}`);
  }
}
