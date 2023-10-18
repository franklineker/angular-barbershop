import { DeleteDialogComponent } from '../../templates/delete-dialog/delete-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients!: Client[]
  client!: Client
  submitType!: any

  constructor(
    private clientsService: ClientsService,
    private deleteDialogCommponent: DeleteDialogComponent
  ){}

  ngOnInit(): void {
      this.clientsService.findClients().subscribe(clients => {
        this.clients = clients
      })
  }

  editClient(client: Client): void {
    this.clientsService.setClientToEdit(client)

  }

  openForm(event: any, client?: Client): void {

    const buttonName = event.currentTarget.getAttribute("name")

    if(buttonName == "editClient") {
      this.submitType = "editClient"
      $("h2").text("Editar Cliente")
      this.client = client!
      document.getElementById("myForm")!.style.display = "block"

    }else if(buttonName == "createClient") {
      this.submitType = "createClient"
      $("h2").text("Criar Cliente")
      $("form[name='clientForm']")
        .find("[type='text'").val("").end()
        .find("[type='number']").val("")
      document.getElementById("myForm")!.style.display = "block"
    }

  }

  openDeleteDialog(event: any, client: Client): void {
    this.deleteDialogCommponent.openDialog(event)
    this.clientsService.setClientToDelete(client)
  }
}
