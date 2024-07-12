import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero-interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }


  //? Obtener héroes, es nuestro primer endpoint
  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  //? Obtener héroes por id
  getHeroById( id: string ):Observable<Hero | undefined>{

    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }


  //? Creamos el autocomplete
  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q${ query }&_limit=6`);
  }

  //? Añadir héroe
  addHero( hero: Hero ):Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero );
  }

  //? Editar héroe parcialmente
  updateHero( hero: Hero ):Observable<Hero> {
    if (!hero.id ) throw Error('Hero id is required')

    return this.http.patch<Hero>(`${ this.baseUrl }/heroes`, hero );
  }

  //? Eliminar héroe
  deleteHeroById( id: string ):Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/heroes/${ id }` )
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }


}
