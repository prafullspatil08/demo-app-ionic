import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturePageRoutingModule } from './feature-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { NfcComponent } from './nfc/nfc.component';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import { ScanQrComponent } from './scan-qr/scan-qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    FeaturePageRoutingModule,
    SharedModule,
    QRCodeModule,
  ],
  providers: [NFC, Ndef],
  declarations: [
    QrCodeComponent,
    DashboardComponent,
    PhotoGalleryComponent,
    ExpenseListComponent,
    NfcComponent,
    ScanQrComponent
  ],
})
export class FeatureModule {}
