import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsService {

    baseUrl = 'http://34.29.168.109:9000/appointments';
    appointmentToDelete!: Appointment;

    constructor(private http: HttpClient) { }

    get(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.baseUrl}`);
    }

    getByClientId(id: string): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.baseUrl}/user/${id}`);
    }

    getAppointmentToDelete(): Appointment {
        return this.appointmentToDelete;
    }

    setAppointmentToDelete(appointment: Appointment): void {
        {
            this.appointmentToDelete = appointment;
        }
    }

    delete(id: String): Observable<Appointment> {
        return this.http.delete<Appointment>(this.baseUrl + `/delete/${id}`);
    }
}
