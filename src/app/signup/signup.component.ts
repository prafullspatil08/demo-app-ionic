import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  signupForm!:FormGroup;
  constructor(private loginService: LoginService, private toastController: ToastController,private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      mobile: new FormControl('',[Validators.required]),
    });
  }
  async signup(){
    if(this.signupForm.status === 'VALID'){
      this.loginService.saveUser(this.signupForm.value).subscribe(async(res:any)=>{
            const toast = await this.toastController.create({
              message: 'User Created Successfully',
              duration: 600,
              position: 'bottom',
              color: 'success',
            });
            await toast.present();
            
            this.router.navigate(['/login']);
            this.signupForm.reset();
      },async(error:any)=>{
        const toast = await this.toastController.create({
          message: error.message,
          duration: 600,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
      })
    }else{
      const toast = await this.toastController.create({
        message: ' Emter Valid Detail',
        duration: 600,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }

  }

}
