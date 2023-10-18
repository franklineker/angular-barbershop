import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from './components/templates/main/main.component';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { HeaderComponent } from './components/templates/header/header.component';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  @ViewChild('header') header!: HeaderComponent

  constructor(
    private mainComponent: MainComponent,
    private router : Router
  ){

  }
  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.header.getLogged()
    //   })
  }

  closeMenu(): void {
    this.mainComponent.closeMenu()
  }
}
