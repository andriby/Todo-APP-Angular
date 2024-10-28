import { Component, Signal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  
  colorCtrl = new FormControl();

  nameCtrl = new FormControl('Adrian', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
  });

  person = {
    name: 'Adrian',
    age: 18,
    img: 'https://cdn.alfabetajuega.com/alfabetajuega/2024/09/luffy-ahora-es-joy-boy-y-la-profecia-esta-completa.jpg?width=1200'
  }

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    })
  }
  
  onClick() {
    console.log('click');
  }

  changeHandler(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.name = newValue;
  }

  keydonwHandler(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.name = newValue;
    
  }

  changeAge(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.age = parseInt(newValue);
    
  }
}
