import { TokenService } from './../../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import Oauth2Service from 'src/app/services/oauth2/oauth2.service';
import * as $ from 'jquery';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQWXYZabcdefghijklmnopqwxyz0123456789';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    showMenuIcon = true;
    authorize_uri = environment.authorize_uri;
    logout_url = environment.logout_url;

    isLogged!: boolean;
    isAdmin!: boolean;

    params: any = {
        client_id: environment.client_id,
        redirect_uri: environment.redirect_uri,
        scope: environment.scope,
        response_type: environment.response_type,
        response_mode: environment.response_mode,
        code_challenge_method: environment.code_challenge_method,
    };

    constructor(
        private main: MainComponent,
        private tokenService: TokenService,
        private oauth2Service: Oauth2Service
    ) { }

    toggleMenu(): void {
        this.main.toggleMenu();
    }

    toggleUserMenu(): void {

        $("[hidden]").is("[hidden]") ? $(".myDropdown-menu").prop("hidden", false) : $(".myDropdown-menu").prop("hidden", true);

    }

    ngOnInit(): void {
        this.getAdmin();
        this.getLogged();
    }

    onLogin(): void {
        const code_verifier = this.oauth2Service.generateCodeVerifier();
        this.tokenService.setVerifier(code_verifier);
        this.params.code_challenge =
            this.oauth2Service.generateCodeChallenge(code_verifier);

        const httpParams = new HttpParams({ fromObject: this.params });
        const codeUrl = this.authorize_uri + httpParams.toString();
        console.log(codeUrl);
        location.href = codeUrl;

    }

    onLogout(): void {
        location.href = this.logout_url;
    }

    getLogged(): void {
        this.isLogged = this.tokenService.isLogged();
    }

    getAdmin(): void {
        this.isAdmin = this.tokenService.isAdmin();
    }

}
