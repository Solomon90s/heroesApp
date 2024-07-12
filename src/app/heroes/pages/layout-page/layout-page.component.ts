import { Component } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label' , url: './list'},
    { label: 'Añadir', icon: 'add' , url: './new-hero'},
    { label: 'Buscar', icon: 'search' , url: './search'},
  ];

  
  constructor( private authService: AuthService) {}
  
  get user():User | undefined {
    return this.authService.currentUser;

  }


  onLogout() {
    this.authService.logout();
  }

}
