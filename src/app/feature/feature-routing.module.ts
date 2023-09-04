import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { NfcComponent } from './nfc/nfc.component';
import { ScanQrComponent } from './scan-qr/scan-qr.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'qr',
      },
      {
        path: 'qr',
        component: QrCodeComponent,
      },
      {
        path: 'expense-list',
        component: ExpenseListComponent,
      },
      {
        path: 'gallery',
        component: PhotoGalleryComponent,
      },
      {
        path: 'nfc',
        component: NfcComponent,
      },
      {
        path: 'scan-qr',
        component: ScanQrComponent,
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturePageRoutingModule {}
