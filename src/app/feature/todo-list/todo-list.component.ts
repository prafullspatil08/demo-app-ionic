import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  addExpenseForm() {}
}
