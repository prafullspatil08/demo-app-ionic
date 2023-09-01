import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  qrCodeString!: string;
  user: any;
  public qrCodeLink: SafeUrl = '';
  scannedQRResult: any;
  content_visibility = '';
  qrCodeForm!:FormGroup;
  constructor(private menuCtrl: MenuController, private toastController: ToastController) {}

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

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedQRResult = result.content;
        console.log(this.scannedQRResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
