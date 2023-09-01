import { Component, OnInit } from '@angular/core';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.component.html',
  styleUrls: ['./nfc.component.scss'],
})
export class NfcComponent  implements OnInit {

  constructor(private nfc: NFC,private alertController: AlertController, private platform:Platform) {
    this.platform.ready().then(() => {
      this.scanNFC();
    }); 
  }

  ngOnInit() {

  }

  scanNFC(){
    this.nfc.addNdefListener(() => {
      this.presentAlert('ok');
    }, (err) => {
      this.presentAlert('ko' + err);
    }).subscribe((event) => {
      console.log(event);
      console.log(JSON.stringify(event));
      this.presentAlert('Il messaggio contiene' + event.tag + ' ' + this.nfc.bytesToHexString(event.tag.id));
    });
  }

  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'attenzione',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }


}
