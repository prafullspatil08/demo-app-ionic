import { Component, OnInit } from '@angular/core';
import {Ndef, NdefEvent, NFC} from '@ionic-native/nfc/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.component.html',
  styleUrls: ['./nfc.component.scss'],
})
export class NfcComponent  implements OnInit {
  event:any;
  existingObservable = false;
  ndefEventObservable: Observable<NdefEvent>;
  nfcSubscription: Subscription;
  listenAlert: HTMLIonAlertElement;
  constructor(private nfc: NFC,private alertCtrl: AlertController, private platform:Platform, private loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      this.scanNFC();
    }); 
  }

  ngOnInit() {

  }

  scanNFC(){
    this.presentAlert('ok');
    // this.nfc.addNdefListener(() => {
    //   this.presentAlert('ok');
    // }, (err) => {
    //   this.presentAlert('ko' + err);
    // }).subscribe((event) => {
    //   console.log(event);
    //   console.log(JSON.stringify(event));

    //   this.presentAlert('Il messaggio contiene' + event.tag + ' ' + this.nfc.bytesToHexString(event.tag.id));
    // });
    this.nfc.addNdefListener().subscribe((res)=>{
      this.event = res;
    })
  }

  async presentAlert(mess) {
    const alert = await this.alertCtrl.create({
      header: 'attenzione',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }

  async onDoneClicked() {
    // this.loading = await this.loadingCtrl.create();
    // await this.loading.present();

    this.setNdefListener()
      .then(() => {
        return this.setNdefSubscription();
      })
      .then(() => {
        // this.loading.dismiss();
        this.setReadNfcAlert();
      })
      .catch(() => {
        // this.loading.dismiss();
        this.alertNfcUnavailable();
      });
  }

  setNdefListener(): Promise<void> {
    console.log('/////////// SET LISTENER');

    return new Promise<void>((resolve, reject) => {
      this.nfc.enabled()
        .then(() => {
          if (!this.existingObservable) {
            this.ndefEventObservable = this.nfc.addNdefListener();
            this.existingObservable = true;
            resolve();
          } else {
            resolve();
          }
        })
        .catch(() => {
          this.existingObservable = false;
          reject(new Error());
        });
    });

  }


  private setNdefSubscription(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nfcSubscription = this.ndefEventObservable.subscribe((event) => {
        this.onNdefEvent(event);
      });
      resolve();
    });
  }

  private onNdefEvent(event) {
    // this.listenAlert.dismiss();

    // Read from register 4
    let payload = this.nfc.bytesToString(event.tag.ndefMessage[4].payload);
    payload = payload.substring(3);

    let restaurantName = this.nfc.bytesToString(event.tag.ndefMessage[3].payload);
    restaurantName = restaurantName.substring(3);

    // this.shoppingService.setOrder(payload)
    //   .then(() => {
    //     this.alertCtrl.create({
    //       message: 'Your order has been successfully submitted for: ' + restaurantName,
    //       buttons: [
    //         {text: 'Okay'}
    //       ]
    //     }).then(alertEl => {
    //       alertEl.present();
    //     });
    //   })
    //   .catch(() => {
    //     this.alertCtrl.create({
    //       message: 'There has been an error while submitting your order, please retry',
    //       buttons: [
    //         {text: 'Okay'}
    //       ]
    //     }).then(alertEl => {
    //       alertEl.present();
    //     });
    //   });

    // this.nfcSubscription.unsubscribe();
  }

  private async setReadNfcAlert() {
    this.listenAlert = await this.alertCtrl.create({
      message: 'Please approach your phone to the NFC tag',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.nfcSubscription.unsubscribe();
          }
        }
      ]
    });
    await this.listenAlert.present();
    await this.listenAlert.onDidDismiss().then(() => {
      this.nfcSubscription.unsubscribe();
    });
  }

  private alertNfcUnavailable() {
    this.alertCtrl.create({
      message: 'Please enable NFC first',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
