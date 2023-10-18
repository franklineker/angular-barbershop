import { BarbersService } from './../../../services/barbers/barbers.service';
import { Barber } from '../../../models/barber.model';
import { Component, OnInit } from '@angular/core';
import { DeleteDialogComponent } from '../../templates/delete-dialog/delete-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-barbers',
    templateUrl: './barbers.component.html',
    styleUrls: ['./barbers.component.css'],
})
export class BarbersComponent implements OnInit {
    selectedFile!: File;
    barbers!: Barber[];
    barber: Barber = {
        id: '',
        profilePicture: { data: '', type: 0 },
        userType: 1,
        person: { name: '', email: '', phone: '', address: '' },
        rating: 0,
        about: '',
        image: this.selectedFile,
    };
    submitType!: string;

    constructor(
        private barberService: BarbersService,
        private deleteDialogComponent: DeleteDialogComponent
    ) { }

    ngOnInit(): void {
        this.barberService.getBarbers().subscribe((barbers) => {
            this.barbers = barbers;
            console.log(barbers);
        });
    }

    onSelectedImage(event: any) {
        this.selectedFile = event.target.files[0];
    }

    openForm(event: any, barber: Barber): void {
        const buttonName = event.currentTarget.getAttribute('name');

        if (buttonName == 'editBarber') {
            this.submitType = 'editBarber';
            $('h2').text('Editar Barbeiro');
            this.barber = barber;
            document.getElementById('myForm')!.style.display = 'block';
        } else if (buttonName == 'createBarber') {
            this.submitType = 'createBarber';
            $('h2').text('Criar Barbeiro');
            $("form[name='barberForm']")
                .find("[type='text'")
                .val('')
                .end()
                .find("[type='number']")
                .val('');
            document.getElementById('myForm')!.style.display = 'block';
        }
    }

    closeForm(): void {
        document.getElementById('myForm')!.style.display = 'none';
    }

    onSubmit(): void {
        const name = $('[name=name]').val()?.toString()!;
        const about = $('[name=about]').val()?.toString()!;

        if (this.submitType == 'createBarber') {
            this.barber.person.name = name;

            this.barber = new Barber(about, this.selectedFile, 0, this.barber.person);
            this.barberService.createBarber(this.barber).subscribe((data) => {
                this.barberService.createOrUpdateResponse = data;
                console.log(data);
            });

            this.uploadImage(this.selectedFile);
        } else if (this.submitType == 'editBarber') {
            const id = this.barber.id;

            if (!this.selectedFile) {
                const base64 = this.barber.profilePicture.data;
                const imageName = 'imageName';
                const imageBlob = this.dataURItoBlob(base64);
                const imageFile = new File([imageBlob], imageName, {
                    type: 'image/png',
                });
                this.selectedFile = imageFile;
            }

            this.barber = new Barber(about, this.selectedFile, 0, this.barber.person);
            this.barber.person.name = name;

            this.barberService.update(id, this.barber).subscribe((data) => {
                this.barberService.createOrUpdateResponse = data;
                console.log(data);
            });

            this.uploadImage(this.selectedFile);
        }
    }

    uploadImage(file: File): void {
        setTimeout(() => {
            this.barberService.uploadImage(file).subscribe((data) => {
                alert(`Corte salvo com sucesso!`);
                window.location.reload();
            });
        }, 500);
    }

    dataURItoBlob(dataURI: any) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        return blob;
    }

    openDeleteDialog(event: any, barber: Barber): void {
        this.deleteDialogComponent.openDialog(event);
        this.barberService.setBarberToDelete(barber);
    }
}
