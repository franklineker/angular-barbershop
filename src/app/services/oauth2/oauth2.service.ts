import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQWXYZabcdefghijklmnopqwxyz0123456789';

@Injectable({
  providedIn: 'root',
})
export default class Oauth2Service {
  token_url = environment.token_url;

  constructor(private http: HttpClient) {}

  public getToken(code: string, code_verifier: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', environment.grant_type);
    body.set('client_id', environment.client_id);
    body.set('redirect_uri', environment.redirect_uri);
    body.set('scope', environment.scope);
    body.set('code_verifier', code_verifier);
    body.set('code', code);

    const basic_auth = 'Basic ' + btoa('client:secret');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
      Authorization: basic_auth,
    });
    const httpOptions = { headers: headers_object };

    return this.http.post<any>(this.token_url, body, httpOptions);
  }

  generateCodeChallenge(code_verifier: string): string {
    const codeVerifierHash = CryptoJS.SHA256(code_verifier).toString(
      CryptoJS.enc.Base64url
    );
    const code_challenge = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    console.log('code_challenge: ' + code_challenge);

    return code_challenge;
  }

  generateCodeVerifier(): string {
    let result = '';
    const char_length = CHARACTERS.length;

    for (let i = 0; i < 44; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * char_length));
    }

    console.log('code_verifier: ' + result);

    return result;
  }
}
