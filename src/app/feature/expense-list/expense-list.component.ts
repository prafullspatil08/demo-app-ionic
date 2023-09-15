import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, IonItemSliding, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-todo-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenseForm: FormGroup;
  today = new Date();
  expenseList = [
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
  constructor(private toastController: ToastController,private actionSheetController: ActionSheetController) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.expenseForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.min(1)]),
      amount: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  async addExpenseForm() {
    if (this.expenseForm?.valid) {
      let payload = {
        ...this.expenseForm?.value,
        id:Math.random().toString()
      };
      this.expenseList.push(payload);
      const toast = await this.toastController.create({
        message: ' Added Expense',
        duration: 600,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
      this.expenseForm.reset();
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

 async deleteItem(id:any,slidingEl: IonItemSliding){
  slidingEl.close();
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to delete this expense?',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.expenseList= this.expenseList?.filter((item)=> item?.id != id)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

  async editItem(id:any,slidingEl: IonItemSliding){
    slidingEl.close();
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to edit this expense?',
      buttons: [{
        text: 'Edit',
        role: 'destructive',
        icon: 'create-sharp',
        handler: () => {
          this.expenseList.forEach((expense:any)=>{
            if(expense?.id == id){
              this.expenseForm.patchValue(expense)
              this.expenseList= this.expenseList?.filter((item)=> item?.id != id)
              return
            }
          })
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  
  }

  cancel(){
    this.expenseForm.reset();
  }

}
