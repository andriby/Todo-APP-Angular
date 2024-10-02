import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todo-app';

  tasks: any = signal([
    'Actualizar Angular',
    'Instalar Angular CLI',
    'Actualizar Angular Material',
  ])

  name = signal('Adrian');
  edad: number = 18;
  disabled: boolean = true;
  img: string = 'https://cdn.alfabetajuega.com/alfabetajuega/2024/09/luffy-ahora-es-joy-boy-y-la-profecia-esta-completa.jpg?width=1200'
  
  person = {
    name: 'Adrian',
    age: 18,
    img: 'https://cdn.alfabetajuega.com/alfabetajuega/2024/09/luffy-ahora-es-joy-boy-y-la-profecia-esta-completa.jpg?width=1200'
  }
  
  onClick() {
    console.log('click');
  }

  changeHandler(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydonwHandler(event: any) {
    const input = event.target as HTMLInputElement;
    console.log(event);
    console.log(input.value);
    const newValue = input.value;
    this.name.set(newValue);
    
  }
}
