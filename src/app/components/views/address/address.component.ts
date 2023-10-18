import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{

  lat = -15.31838617488881;
  lng = -41.75630261779039;

  constructor(){}

ngOnInit(): void {

}

}
