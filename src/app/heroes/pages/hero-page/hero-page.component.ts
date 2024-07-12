import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero-interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // delay(1500),
        switchMap( ({ id }) => this.heroService.getHeroById( id )),
      )
      .subscribe( hero => {
        /*
          ! Con esta comprobación lo que hacemos es que si el id no existe
          ! nos redirija a la página /heroes/list
        */
        if (!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        console.log({hero});
        return;
      });
  }


  goBack():void {
    this.router.navigateByUrl('/heroes/list');
    }




}

