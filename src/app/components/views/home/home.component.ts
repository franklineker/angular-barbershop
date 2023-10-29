import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    isLogged!: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.isLogged = this.tokenService.isLogged();
        console.log(this.isLogged)
    }
}
