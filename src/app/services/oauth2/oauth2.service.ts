import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { TokenService } from '../token/token.service';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQWXYZabcdefghijklmnopqwxyz0123456789';

@Injectable({
    providedIn: 'root',
})
export default class Oauth2Service {
    token_url = environment.token_url;
    authorize_uri = environment.authorize_uri;
    params: any = {
        client_id: environment.client_id,
        redirect_uri: environment.redirect_uri,
        scope: environment.scope,
        response_type: environment.response_type,
        response_mode: environment.response_mode,
        code_challenge_method: environment.code_challenge_method,
    };

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

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

    getCode(): void {
        const code_verifier = this.generateCodeVerifier();
        this.tokenService.setVerifier(code_verifier);
        this.params.code_challenge =
            this.generateCodeChallenge(code_verifier);

        const httpParams = new HttpParams({ fromObject: this.params });
        const codeUrl = this.authorize_uri + httpParams.toString();
        console.log(codeUrl)
        location.href = codeUrl;
    }
}
