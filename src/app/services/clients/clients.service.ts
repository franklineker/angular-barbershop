import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client.model';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    baseUrl = 'http://localhost:9000/clients';
    createOrUpdateResponse: any;
    clientToDelete!: Client;
    clientToEdit!: Client;

    constructor(private http: HttpClient) { }

    findClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.baseUrl}`);
    }

    setClientToDelete(client: Client): void {
        this.clientToDelete = client;
    }

    getClientToDelete(): Client {
        return this.clientToDelete;
    }

    setClientToEdit(client: Client): void {
        this.clientToEdit = client;
    }

    getClientToEdit(): Client {
        return this.clientToEdit;
    }

    create(client: Client): Observable<Client> {
        return this.http.post<Client>(`${this.baseUrl}/save`, client);
    }

    update(client: Client): Observable<Client> {
        console.log(client.id)
        return this.http.put<Client>(`${this.baseUrl}/update/${client.id}`, client);
    }

    uploadImage(file: File): Observable<FormData> {
        const formData = new FormData();
        formData.append('file', file);
        const id = this.clientToEdit.id;

        return this.http.put<FormData>(
            `${this.baseUrl}/updateImage/${id}`,
            formData
        );
    }

    delete(id: String): Observable<Client> {
        return this.http.delete<Client>(`${this.baseUrl}/delete/${id}`);
    }
}
