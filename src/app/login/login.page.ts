import { async } from '@angular/core/testing';
import { AccessService } from './../services/access.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password = '';
  hasBiometricAuth = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private accessService: AccessService) { }

  // async ngOnInit() {
  //   const available = await BiometricAuth.isAvailable()
  //   this.hasBiometricAuth = available.has;
  //   if (this.hasBiometricAuth) {
  //     this.openBiometricAuth();
  //   }
  // }

  async openBiometricAuth() {
    const authResult = await BiometricAuth.verify(
      {
        reason: 'Entra con la tua Impronta o con il FaceId',
        title: 'Entra con la tua Impronta o con il FaceId',
      }
    );
    if (authResult.verified) {
      this.accessService.signInwithBiometricAuth();
      this.router.navigateByUrl('/home');
    }
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.accessService.signIn(this.email, this.password).then((res) => {
      loading.dismiss();
      this.router.navigateByUrl('/home');
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: ':(',
        message: err.message,
        buttons: ['OK']
      });
      await alert.present();
    })
  }

  goToSignUp() {
    this.router.navigateByUrl('/register');
  }

}
