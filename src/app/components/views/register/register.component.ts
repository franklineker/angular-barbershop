import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    fulName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    onSubmit(): void {

        let user = new User(this.fulName, this.email, this.password, ["CLIENT"]);
        console.log(user);
        if (this.password != this.confirmPassword) {
            alert("Senhas não conferem.");
            return;
        }



        this.userService.create(user).subscribe(data => {
            alert("Usuário criado com sucesso!");
            this.router.navigate(['']);
        })

    }

}
