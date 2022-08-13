import { async } from '@angular/core/testing';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUpdate } from './../model/appUpdate.model';

const { NativeMarket } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  updagteExample = 'https://60ab75bd5a4de40017cca268.mockapi.io/api/woodcut/version';
  mantainenceExample = 'https://60ab75bd5a4de40017cca268.mockapi.io/api/woodcut/mantainence';

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private appVersion: AppVersion,
    private plt: Platform
    ) { }

    async checkForUpdate() {
      this.http.get(this.updagteExample).subscribe(async (info: AppUpdate) => {
        if (info.enabled) {
          const versionNumber = await this.appVersion.getVersionNumber();
          // 1.2.0
          const splittedVersion = versionNumber.split('.');
          const serverVersion = info.current.split('.');

          if (serverVersion[0] > splittedVersion[0]) {
            this.presentAlert(info.majorMsg.title, info.majorMsg.msg, info.majorMsg.btn);
          } else if (serverVersion[1] > splittedVersion[1])
          this.presentAlert(info.minorMsg.title, info.minorMsg.msg, info.minorMsg.btn, true);
        }
      });
    }

    async checkForMantainance() {
      this.http.get(this.mantainenceExample).subscribe(async (info: AppUpdate) => {
        if (info.enabled) {
          this.presentAlert(info.msg.title, info.msg.msg);
        }
      });
    }

    openAppStoreEntry() {
      if (this.plt.is('android')) {
        NativeMarket.openStoreListing({
          appId: 'io.ionic5.starter'
        });
      } else {
      }
    }

    async presentAlert(header, message, buttonText = '', allowClose = false) {
      const buttons: any = [];

      if (buttonText != '') {
        buttons.push({
          text: buttonText,
          handler: () => {
            this.openAppStoreEntry();
          }
        });
      }

      if (allowClose) {
        buttons.push({
          text: 'Chiudi',
          role: 'Cancella'
        });
      }

      const alert = await this.alertController.create({
        header,
        message,
        buttons,
        backdropDismiss: allowClose
      });
      await alert.present();
    }
}
