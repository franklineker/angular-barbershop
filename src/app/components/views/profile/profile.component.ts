import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { Person } from '../../../models/person.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { BarbersService } from 'src/app/services/barbers/barbers.service';
import { Barber } from 'src/app/models/barber.model';
import { User } from 'src/app/models/user.model';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userEmail = this.tokenService.getUserEmail();
    isLogged!: boolean;
    isAdmin!: boolean;
    isBarber!: boolean;
    isClient!: boolean;
    clients!: Client[];
    isImagePresent!: boolean;
    selectedImage!: File;
    client: Client = {
        id: "",
        userType: 3,
        image: {
            data: "",
            type: 0
        },
        person: {
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    };
    barber: Barber = {
        id: "",
        profilePicture: {
            data: "",
            type: 0
        },
        image: this.selectedImage,
        about: "",
        rating: 0,
        person: {
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    };
    admin: User = {
        name: "",
        email: "",
        password: "",
        roles: []
    };
    imageURL = '../../../assets/images/manoel-gomes.png';

    constructor(
        private clientsService: ClientsService,
        private userService: UserService,
        private barberService: BarbersService,
        private tokenService: TokenService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getIsAdmin();
        this.getIsBarber();
        this.getIsClient();

        if (this.isAdmin) {
            $("label[for='name']").remove();
            $("label[for='phone']").remove();
            $("label[for='address']").remove();
            this.userService.findAll().subscribe(users => {
                this.admin = users.filter(u => u.email == this.userEmail)[0];
                console.log("admin -> ", this.admin);
            });
        } else if (this.isBarber) {
            this.barberService.getBarbers().subscribe(barbers => {
                this.barber = barbers.filter(b => b.person.email == this.userEmail)[0];
                this.isImagePresent = this.barber.profilePicture ? true : false;
                this.imageURL = this.barber.profilePicture.data;
                console.log("barber -> ", this.barber);
            })
        } else {
            this.clientsService.findClients().subscribe(clients => {

                if ((this.userEmail?.split("@").length)! > 1) {
                    this.client = clients.filter(c => c.person.email == this.userEmail)[0];
                    this.isImagePresent = this.client.image ? true : false;
                    this.imageURL = this.client.image.data;
                    console.log("cliente com @", this.client)
                } else {
                    this.client = clients.filter(c => c.person.email == this.userEmail)[0];
                    console.log(this.client)
                }
            });
        }

        this.getLogged();
        if (!this.isLogged) {
            this.router.navigate(["register"]);
            return;
        }

    }


    onSubmit(): void {
        if (this.selectedImage?.size > 1048576) {
            alert("O arquivo que você anexou é muito grande. Por favor, selecione um arquivo menor.")
            this.selectedImage
            return;
        }
        const id = this.client.id;
        const name = $("[name=userName]").val()?.toString()!;
        const email = $("[name=userEmail]").val()?.toString()!;
        const phone = $("[name=userPhone]").val()?.toString()!;
        const address = $("[name=userAddress]").val()?.toString()!;

        const person: Person = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };

        let client = new Client(3, person);
        client.id = id;

        this.clientsService.setClientToEdit(client);

        this.clientsService.update(client).subscribe(client => {
            console.log(client);
            this.clientsService.createOrUpdateResponse = client;
        });
        this.updatePicture(this.selectedImage);
    }

    updatePicture(file: File): void {
        setTimeout(() => {
            this.clientsService.uploadImage(file).subscribe(data => {
                alert("Cliente salvo com sucesso");
                window.location.reload();
            })
        }, 500);
    }

    onSelectedImage(event: any): void {
        this.selectedImage = event.target.files[0];

        if (event.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(this.selectedImage);
            reader.onload = (e: any) => {
                this.imageURL = e.target.result
            };
        }

        $("[alt='image-placeholder']").attr("src", "{{imageURL}}");
        $(".file-container").removeAttr("hidden");

    }

    getLogged(): void {
        this.isLogged = this.tokenService.isLogged();
    }

    getIsAdmin(): void {
        this.isAdmin = this.tokenService.isAdmin();
    }
    getIsBarber(): void {
        this.isBarber = this.tokenService.isBarber();
    }
    getIsClient(): void {
        this.isClient = this.tokenService.isClient();
    }
}
