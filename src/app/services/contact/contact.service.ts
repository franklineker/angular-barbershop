import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }
  url = "https://emailvalidation.abstractapi.com/v1/?api_key=981e5673a16741609f35a574760afca4&email=frankdebouer@hotmail.com"

}
