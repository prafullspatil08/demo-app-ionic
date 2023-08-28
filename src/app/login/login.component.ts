import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private toastController: ToastController,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get getEmail() {
    return this.loginForm.controls['email'];
  }

  async login() {
    if (this.loginForm.status === 'VALID') {
      this.loginService.getUserList().subscribe(
        async (res: any) => {
          let response = res;
          const user = response?.find((a: any) => {
            localStorage.setItem('user', JSON.stringify(a))
            return (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password
            );
          });
          if (user) {
            this.loginService.isLoggedIn.next(true)
            const toast = await this.toastController.create({
              message: 'Login Successfully',
              duration: 600,
              position: 'bottom',
              color: 'success',
            });
            await toast.present();
            
            this.router.navigate(['/dashboard']);
            this.loginForm.reset();
          } else {
            const toast = await this.toastController.create({
              message: 'Invalid credentials !!!',
              duration: 600,
              position: 'bottom',
              color: 'danger',
            });
            await toast.present();
          }
        },
        async (error:any) => {
          const toast = await this.toastController.create({
            message: error.message,
            duration: 600,
            position: 'bottom',
            color: 'danger',
          });
          await toast.present();
        }
      );

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
