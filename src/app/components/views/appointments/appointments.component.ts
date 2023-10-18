import { AppointmentsService } from './../../../services/appointments/appointments.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../models/appointment.model';
import { Barber } from '../../../models/barber.model';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
    appointments!: Appointment[];
    barber!: Barber;
    isAdmin!: boolean;

    constructor(
        private appointmentsService: AppointmentsService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.appointmentsService.get().subscribe((appointments) => {
            this.appointments = appointments;
            console.log(this.appointments)
        });
    }

    getAdmin(): void {
        this.isAdmin = this.tokenService.isAdmin();
    }
}
