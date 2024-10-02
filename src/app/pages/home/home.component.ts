import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks: any = signal([
    'Actualizar Angular',
    'Instalar Angular CLI',
    'Actualizar Angular Material',
  ])

}
