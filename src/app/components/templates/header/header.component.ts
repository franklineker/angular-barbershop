import { TokenService } from './../../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { environment } from 'src/environments/environment';
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
    logout_url = environment.logout_url;

    isLogged!: boolean;
    isAdmin!: boolean;

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
        this.oauth2Service.onLogin();

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
