import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AccessService } from '../services/access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  email: string;
  displayName: string;
  password = '';
  password2 = '';
  disableSignUp = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private accessService: AccessService
  ) { }

  async signUp(f: NgForm) {

    if (this.password !== this.password2) {
      const alert = await this.alertController.create({
        header: 'Registrazione fallita',
        message: 'Le password non coincidono',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const loading = await this.loadingController.create();
      await loading.present();

      this.accessService.singUp(this.email, this.password, this.displayName).then(user => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      }, async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registrazione fallita',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      })
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
