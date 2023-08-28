import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturePageRoutingModule } from './feature-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
import { ProfileComponent } from './profile/profile.component';
import { ListViewComponent } from './list-view/list-view.component';

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
    LoginComponent,
    DashboardComponent,
    ScanQrComponent,
    ProfileComponent,
    ListViewComponent,
  ],
})
export class FeatureModule {}
