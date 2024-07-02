import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Todo List</h1>
    <input #todoInput (keyup.enter)="addTodo(todoInput.value); todoInput.value = ''">
    <button (click)="addTodo(todoInput.value); todoInput.value = ''">Add Todo</button>
    <ul>
      <li *ngFor="let todo of todos">
        <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo)">
        {{ todo.title }}
        <button (click)="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo(title: string) {
    if (title.trim()) {
      this.todoService.addTodo({ title }).subscribe(todo => {
        this.todos.push(todo);
      });
    }
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }
}