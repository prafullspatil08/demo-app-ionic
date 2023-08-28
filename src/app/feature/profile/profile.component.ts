import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  user:any;
  profileForm:FormGroup;
  constructor(private loginService: LoginService,private toastController: ToastController) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user'))
    this.initializeForm();
  }

  initializeForm(){
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName,[Validators.required]),
      email: new FormControl(this.user?.email,[Validators.required, Validators.email]),
      password: new FormControl(this.user?.password,[Validators.required]),
      mobile: new FormControl(this.user?.mobile,[Validators.required]),
    })
  }

 async updateProfile(){
    if(this.profileForm.status === 'VALID'){
      let payload = {
          ...this.profileForm.value,
          id: this.user?.id
      }
      this.loginService.updateUser(payload).subscribe(async(res:any)=>{
        console.log('res: ', res)
        // localStorage.setItem('user', JSON.stringify(res))
        const toast = await this.toastController.create({
          message: 'Update Successfully',
          duration: 600,
          position: 'bottom',
          color: 'success',
        });
        await toast.present();
      })
    }
  }
}
