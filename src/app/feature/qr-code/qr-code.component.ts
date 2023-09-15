import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MenuController, ToastController, ViewDidLeave } from '@ionic/angular';
import { ScanQrComponent } from '../scan-qr/scan-qr.component';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  qrCodeString!: string;
  component = ScanQrComponent;
  user: any;
  public qrCodeLink: SafeUrl = '';
  
  content_visibility = '';
  qrCodeForm!:FormGroup;
  constructor(private menuCtrl: MenuController, private toastController: ToastController, private router: Router) {}
 

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.initializeForm();
  }

  initializeForm(){
    this.qrCodeForm = new FormGroup({
      qrCodeString: new FormControl(this.user?.email,[Validators.required,Validators.minLength(2)])
    })
  }

  async generateQR(){
    if(this.qrCodeForm.valid ){
      this.menuCtrl.enable(true, 'qr-menu');
      this.menuCtrl.open('end');
    }else{
      const toast = await this.toastController.create({
        message: 'Please enter value to generate QR',
        duration: 600,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  get form(){
    return this.qrCodeForm;
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeLink = url;
  }

  startScan() {
    this.router.navigateByUrl('/dashboard/scan-qr');
  }

 

  closeQR(){
    this.menuCtrl.close();
  }

 
}
