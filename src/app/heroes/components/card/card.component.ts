import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero-interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    //? realizamos una validación para comprobar si el hero existe
    if ( !this.hero ) throw Error('Hero property is required');


  }


}
