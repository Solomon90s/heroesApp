import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero-interfaces';
import { HeroesService } from '../../services/heroes-service.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  //! Formulario reactivo
  public heroForm = new FormGroup({
    /*
      ? el valor inicial es un string vacío new FormControl('')
      ? superhero:        new FormControl<string>('', { nonNullable: true }),
      ? siempre va a ser un string, porque le estamos indicando <string> de que tipo es
      ? y además con el notNullable: true le estamos diciendo que no puede ser null
    */
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  //? Creamos un getter del heroe actual
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    /*
    ? Realizamos la comprobación de si la url incluye la palabra edit
    */

    if (!this.router.url.includes('edit')) return;

    this.ActivatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return;
      });
  }

  /*
  ? Con este método realizamos la comprobación de enviar el formulario
  */
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    /*
    ? Aquí realizamos la comprobación de si el heroe actual tiene id
    ? eso quiere decir que queremos actualizar el heroe
    */

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackBar(`${hero.superhero} updated!`);
      });

      return;
    }

    /*
    ? despues de realizar la comprobación de si el heroe actual tiene id
    ? si no tiene id es que queremos editar el heroe
    */

    this.heroService.addHero(this.currentHero).subscribe((hero) => {
      //TODO mostrar snackbar, y navegar a /heroes/edit/ hero.id
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackBar(`${hero.superhero} created!`);
    });
  }

  //? Método para borrar héroe
  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.heroService.deleteHeroById( this.currentHero.id )),
      filter( (wasDeleted: boolean )=> wasDeleted ),
      )
    .subscribe(result => {
      //? Este subscribe se dispara SÓLO SI SE HA BORRADO
      this.router.navigate(['/heroes'])
    });
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
