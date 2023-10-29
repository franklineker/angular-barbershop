import { DeleteDialogComponent } from '../../templates/delete-dialog/delete-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    clients!: Client[];
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
    submitType!: any;
    collapsedClients!: boolean[];

    constructor(
        private clientsService: ClientsService,
        private deleteDialogCommponent: DeleteDialogComponent
    ) { }

    ngOnInit(): void {
        this.clientsService.findClients().subscribe(clients => {
            this.clients = clients;
            this.collapsedClients = new Array(this.clients.length).fill(true);
        });
    }

    editClient(client: Client): void {
        this.clientsService.setClientToEdit(client);
    }

    openForm(event: any, client?: Client): void {

        const buttonName = event.currentTarget.getAttribute("name");

        if (buttonName == "editClient") {
            this.submitType = "editClient";
            $(".form-title").text("Editar Cliente");
            this.client = client!;
            document.getElementById("myForm")!.style.display = "block";

        } else if (buttonName == "createClient") {
            this.submitType = "createClient";
            $("h2").text("Criar Cliente");
            $("form[name='clientForm']")
                .find("[type='text'").val("").end()
                .find("[type='number']").val("");
            document.getElementById("myForm")!.style.display = "block";
        }

    }

    closeForm(): void {
        document.getElementById('myForm')!.style.display = 'none';
    }

    onSubmit(): void {
        const name = $('[name=name]').val()?.toString()!;
        const phone = +$('[name=phone]').val()!;
        const address = $('[name=address]').val()?.toString()!;

        // if (this.submitType == 'createOrder') {
        //     this.order = new Order(title, price, description, this.selectedFile);
        //     console.log(this.selectedFile);
        //     this.orderService.createOrder(this.order).subscribe((data) => {
        //         this.orderService.createOrUpdateResponse = data;
        //         console.log(data);
        //     });

        //     this.uploadImage(this.selectedFile);
        // } else if (this.submitType == 'editOrder') {
        //     const id = this.order.id;

        //     const order = new Order(title, price, description, this.selectedFile);

        //     this.orderService.update(id, order).subscribe((data) => {
        //         this.orderService.createOrUpdateResponse = data;
        //     });

        //     this.uploadImage(this.selectedFile);
        // }
    }

    openDeleteDialog(event: any, client: Client): void {
        this.deleteDialogCommponent.openDialog(event);
        this.clientsService.setClientToDelete(client);
    }

    toggleCollapse(index: number) {
        this.collapsedClients[index] = !this.collapsedClients[index];
    }
}
