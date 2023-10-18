import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    base_url = "http://localhost:9000/users";

    constructor(
        private http: HttpClient
    ) { }

    create(user: User): Observable<User> {
        return this.http.post<User>(`${this.base_url}/save`, user);
    }
}
