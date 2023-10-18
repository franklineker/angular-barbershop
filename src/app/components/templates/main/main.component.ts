import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  isAdmin!: boolean;
  isLogged!: boolean;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getLogged();
    this.getAdmin();
  }

  toggleMenu(): void {
    $('nav').attr('visibility', function (index, oldValue) {
      return oldValue == 'true' ? 'false' : 'true';
    });
  }

  closeMenu(): void {
    $('nav').attr('visibility', 'false');
  }

  getLogged(): void {
    this.isLogged = this.tokenService.isLogged();
  }

  getAdmin(): void {
    this.isAdmin = this.tokenService.isAdmin();
  }
}
