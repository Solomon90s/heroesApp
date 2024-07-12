import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero-interfaces';
import { HeroesService } from '../../services/heroes-service.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  constructor( private heroService: HeroesService) { }

  public heroes: Hero[] = [];


  // //! Así lo hacemos en clase
  // ngOnInit(): void {
  //   this.heroService.getHeroes()
  //     .subscribe({
  //       next: (date:Hero[]) => {
  //         this.heroes = date;
  //         console.log(date);
  //       },
  //       error: (err) =>{
  //         alert(err.message);
  //       },
  //       complete: () => {
  //         console.log('Done');
  //       }
  //     });
  // }

  //! Así lo hace Fernando Herrera
  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe( heroes => this.heroes = heroes );
  }



}
