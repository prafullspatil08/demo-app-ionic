import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  todoForm: FormGroup;
  today = new Date();
  todoList = [
    {
      id:'1',
      title: 'Toilet Paper',
      amount: 238,
      date: '2020-12-12',
    },
    {
      id:'2',
      title: 'Car Insurance',
      amount: 10.2,
      date: '2020-12-12',
    },
  ];
  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.min(1)]),
      amount: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  async addExpenseForm() {
    if (this.todoForm?.valid) {
      let payload = {
        ...this.todoForm?.value,
        id:Math.random().toString()
      };
      this.todoList.push(payload);
      const toast = await this.toastController.create({
        message: ' Added Expense',
        duration: 600,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
      this.todoForm.reset();
    } else {
      const toast = await this.toastController.create({
        message: ' Enter Valid Detail',
        duration: 600,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  deleteItem(id:any){
    this.todoList= this.todoList?.filter((item)=> item?.id != id)
  }

  editItem(id:any){
    this.todoList= this.todoList?.filter((item)=> item?.id == id)
    this.todoForm.patchValue(this.todoList[0])
  }

  cancel(){
    this.todoForm.reset();
  }

}
