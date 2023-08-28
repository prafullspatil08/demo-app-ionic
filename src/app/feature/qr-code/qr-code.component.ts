import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent  implements OnInit {
  qrCodeString!:string;
  user:any;
  public qrCodeLink: SafeUrl = '';
  constructor() { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('user'))
    console.log('this.user: ', this.user)
    this.qrCodeString = this.user?.email
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeLink = url;
  }

}
