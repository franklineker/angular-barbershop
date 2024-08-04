import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { Barber } from 'src/app/models/barber.model';
import { Order } from 'src/app/models/order.model';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root',
})
export class AgendaService {
    baseUrl = 'http://34.29.168.109:9000';
    barbers!: Barber[];
    orders!: Order[];

    token = '' + this.tokenService.getAccessToken();
    headers_object = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
    });
    httpOptions = { headers: this.headers_object };

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    setAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(
            `${this.baseUrl}/appointments/save`,
            appointment
            // this.httpOptions
        );
    }
}
