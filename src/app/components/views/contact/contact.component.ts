import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // FormData!: any

  // constructor(private builder: FormBuilder, private contact: ContactService) { }
  // onSubmit(FormData: FormData) {
  //     this.contact.PostMessage(FormData)
  //       .subscribe(response => {
  //         location.href = 'https://mailthis.to/confirm'
  //       }, error => {
  //       console.warn(error.responseText)
  //       console.log({ error })
  //     })
  // }


}
