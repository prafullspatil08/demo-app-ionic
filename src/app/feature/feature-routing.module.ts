import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NfcComponent } from './nfc/nfc.component';
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
        path: 'todo-list',
        component: TodoListComponent,
      },
      {
        path: 'gallery',
        component: PhotoGalleryComponent,
      },
      {
        path: 'nfc',
        component: NfcComponent,
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
