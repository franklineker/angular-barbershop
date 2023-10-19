import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { Person } from '../../../models/person.model';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    isLogged!: boolean;
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
    // client!: Client;
    imageURL = '../../../assets/images/figaro.png';

    constructor(
        private clientsService: ClientsService,
        private tokenService: TokenService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.clientsService.findClients().subscribe(clients => {
            console.log(clients)

            const googleSub = this.tokenService.getGoogleSub();

            if ((googleSub?.split("@").length)! > 1) {
                this.client = clients.filter(c => c.person.email == googleSub)[0];
                console.log("cliente com @", this.client)
                this.isImagePresent = this.client.image ? true : false;
            } else {
                this.client = clients.filter(c => c.googleSub == googleSub)[0];
                if (this.client.image == null) {
                    this.client.image = { data: "", type: 0 }
                }
                console.log(this.client)
            }
        });

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
        const googleSub = this.client.googleSub;
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
        client.googleSub = googleSub;

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
}
