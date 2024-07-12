import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;

  //? Al cargar la aplicación el usuario es null
  private user?: User;

  constructor( private http: HttpClient) { }

  get currentUser():User | undefined {
    if ( !this.user) return undefined;
    /*
    ? return structuredClone( this.user );
    ? Crea un clon profundo de un objeto.
    */
    return structuredClone( this.user );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'asdfasdfasdf.asdfasdf.asdf' )),
      );
  }


  //? Método para comprobar autenticación
  checkAuthentication(): Observable<boolean>{

    if ( !localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        //? Con !! hacemos la negación de la negación
        map( user=> !!user ),
        catchError( err => of(false) )
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }



}
