import { Component, OnInit } from '@angular/core';
import { Chair } from '../../../models/chair.model';
import { ChairsService } from 'src/app/services/chairs/chairs.service';

@Component({
  selector: 'app-chairs',
  templateUrl: './chairs.component.html',
  styleUrls: ['./chairs.component.css']
})
export class ChairsComponent implements OnInit{

  chairs!: Chair[]
  idArray!: Number[]

  constructor(
    private chairService: ChairsService
  ){}

  ngOnInit(): void {
      this.chairService.findChairs().subscribe(chairs => {
        let index = 1
        this.chairs = chairs.map(c => {
          c.id = index
          index++
          return c
        })
        console.log(this.chairs)
      })
  }
}
