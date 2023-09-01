import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { usersData } from '../_miscellaneous/UserData';
import {
  EMAIL_PATTERN,
  MOBILE_PATTER,
  PASS_PATTERN,
} from '../_miscellaneous/pattern';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isShowPassword:boolean = false;
  constructor(
    private loginService: LoginService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(PASS_PATTERN),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(MOBILE_PATTER),
      ]),
    });
  }
  async signup() {
    if (this.signupForm?.valid) {
      // this.loginService.saveUser(this.signupForm.value).subscribe(async(res:any)=>{
      //       const toast = await this.toastController.create({
      //         message: 'User Created Successfully',
      //         duration: 600,
      //         position: 'bottom',
      //         color: 'success',
      //       });
      //       await toast.present();

      //       this.router.navigate(['/login']);
      //       this.signupForm.reset();
      // },async(error:any)=>{
      //   const toast = await this.toastController.create({
      //     message: error.message,
      //     duration: 600,
      //     position: 'bottom',
      //     color: 'danger',
      //   });
      //   await toast.present();
      // })
      let payload = {
        ...this.signupForm?.value,
        id: Math.random().toString(),
      };
      usersData.push(payload);
      const toast = await this.toastController.create({
        message: 'User Created Successfully',
        duration: 600,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['/login']);
      this.signupForm.reset();
    }
  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword
  }
}
