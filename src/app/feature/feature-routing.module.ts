import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListViewComponent } from './list-view/list-view.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
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
        path: 'list-view',
        component: ListViewComponent,
      },
      {
        path: 'gallery',
        component: PhotoGalleryComponent,
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
