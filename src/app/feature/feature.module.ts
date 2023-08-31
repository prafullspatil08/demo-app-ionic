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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FeaturePageRoutingModule,
    SharedModule,
    QRCodeModule,
  ],
  declarations: [
    QrCodeComponent,
    DashboardComponent,
    PhotoGalleryComponent,
    ExpenseListComponent,
    NfcComponent
  ],
})
export class FeatureModule {}
