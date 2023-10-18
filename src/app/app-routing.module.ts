import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { AgendaComponent } from './components/views/agenda/agenda.component';
import { BarbersComponent } from './components/views/barbers/barbers.component';
import { OrdersComponent } from './components/views/orders/orders.component';
import { AppointmentsComponent } from './components/views/appointments/appointments.component';
import { ClientsComponent } from './components/views/clients/clients.component';
import { ContactComponent } from './components/views/contact/contact.component';
import { AddressComponent } from './components/views/address/address.component';
import { ChairsComponent } from './components/views/chairs/chairs.component';
import { ReportsComponent } from './components/views/reports/reports.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { LogoutComponent } from './components/views/logout/logout.component';
import { RegisterComponent } from './components/views/register/register.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'agenda',
        component: AgendaComponent,
    },
    {
        path: 'barbers',
        component: BarbersComponent,
    },
    {
        path: 'orders',
        component: OrdersComponent,
    },
    {
        path: 'appointments',
        component: AppointmentsComponent,
    },
    {
        path: 'clients',
        component: ClientsComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'address',
        component: AddressComponent,
    },
    {
        path: 'chairs',
        component: ChairsComponent,
    },
    {
        path: 'reports',
        component: ReportsComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'authorized',
        component: AuthorizedComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
