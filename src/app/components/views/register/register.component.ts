import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Person } from 'src/app/models/person.model';
import { User } from 'src/app/models/user.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { UserService } from 'src/app/services/user/user.service';
import { HeaderComponent } from '../../templates/header/header.component';
import Oauth2Service from 'src/app/services/oauth2/oauth2.service';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    loginForm: FormGroup;
    code = "";
    name!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
    isLogged!: boolean;

    // constructor(
    //     private userService: UserService,
    //     private router: Router,
    //     private activatedRoute: ActivatedRoute,
    //     private clientsService: ClientsService,
    //     private oauth2Service: Oauth2Service,
    //     private tokenService: TokenService
    // ) { }

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private clientsService: ClientsService,
        private oauth2Service: Oauth2Service,
        private tokenService: TokenService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.getLogged()
    }

    onLogin(): void {
        this.oauth2Service.getCode();
    }

    onRegister(): void {

        let user = new User(this.name, this.email, this.password, ["CLIENT"]);
        console.log(user);
        if (this.password != this.confirmPassword) {
            alert("Senhas não conferem.");
            return;
        }

        const person = new Person(this.name, "", this.email, "");
        const client = new Client(3, person);


        this.userService.create(user).subscribe(data => {
            this.clientsService.create(client).subscribe(data => console.log("cliente criado."));
            alert("Usuário criado com sucesso!");
            this.router.navigate(['']);
        })

    }

    getLogged(): void {
        this.isLogged = this.tokenService.isLogged();
    }

    getToken(code: string, code_verifier: string): void {
        this.oauth2Service.getToken(code, code_verifier).subscribe((data) => {
            this.tokenService.setTokens(data['access_token'], data['refresh_token']);
        }),
            (err: any) => {
                console.log(err);
            };
    }

}
