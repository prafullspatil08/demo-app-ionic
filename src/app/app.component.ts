import { Component, Optional, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  constructor(private platform: Platform) {
    this.backButtonEvent();
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async (res) => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
       } else {
          App.exitApp();
       }
    });
  }
}
