import { Component, computed, effect, Inject, Injector, OnInit, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Crear nuevo proyecto Angular',
      done: true
    },
    {
      id: 2,
      title: 'Instalar Angular Material',
      done: false
    },
    {
      id: 3,
      title: 'Crear componentes',
      done: false
    },
  ])

  newTaskCtrl = new FormControl('Tarea', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^\S.*$/)
    ]
  })

  filter = signal<'all' | 'completed' | 'pending'>('all')

  taskByFilter = computed(() => {
    const filter = this.filter()
    const tasks = this.tasks()

    if(filter === 'completed'){
      return tasks.filter(tasks => tasks.done)
    }else if(filter === 'pending'){
      return tasks.filter(tasks => !tasks.done)
    }else{
      return tasks
    }
  })

  injector = Inject(Injector)

  constructor(){
    this.newTaskCtrl.valueChanges.subscribe(value => {
      if (value !== null) {
        const trimmedValue = value.replace(/^\s+/, '');
        if (trimmedValue !== value) {
          this.newTaskCtrl.setValue(trimmedValue, { emitEvent: false });
        }
      }
    });

    this.trackTasks();
  }

  ngOnInit(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    })
  }

  addTask(event: Event) {
    if (this.newTaskCtrl.valid) {
      const input = event.target as HTMLInputElement;
      const newTask = input.value;
      this.tasks.update((tasks) => [...tasks, { id: tasks.length + 1, title: newTask, done: false }]);
      input.value = '';
      this.newTaskCtrl.setValue('')
    }else{
      alert("Ingrese una tarea")
    }
  }

  deleteTask(i: number){
    this.tasks.update((tasks) => tasks.filter((task, index) => index !== i));
  }

  updateTaskEditingMode(i: number){
    this.tasks.update(prevState => {
      return prevState.map((task, index) =>{
        if(index == i){
          return {
            ...task,
            editing: !task.editing
          }
        }
        return {
          ...task,
          editing: false
        }
      })
    })
  }

  updateTaskTitle(i: number, event: Event){
    this.tasks.update(prevState => {
      return prevState.map((task, index) =>{
        if(index == i){
          return {
            ...task,
            title: (event.target as HTMLInputElement).value,
            editing: false
          }
        }
        return {
          ...task,
        }
      })
    })
  }

  doneTask(i: number){
    this.tasks.update((tasks) => tasks.map(
      (task, index) => index === i ? {...task, done: !task.done} : task)
    );
  }

  changeFilter(filter: 'all' | 'completed' | 'pending'){
    this.filter.set(filter)
  }

  clearCompleted(){
    this.tasks.update((tasks) =>
      tasks.filter(task => !task.done)
    )
  }
}
