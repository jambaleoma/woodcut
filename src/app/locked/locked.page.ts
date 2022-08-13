import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { BiometricAuth } = Plugins;

@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})
export class LockedPage implements OnInit {

  password = '1234';
  hasBiometricAuth = false;

  constructor( private modalController: ModalController) { }

  async ngOnInit() {
    const available = await BiometricAuth.isAvailable()
    this.hasBiometricAuth = available.has;
    if (this.hasBiometricAuth) {
      this.openBiometricAuth();
    }
  }

  async openBiometricAuth() {
    const authResult = await BiometricAuth.verify(
      {
        reason: 'La tua sessione è scaduta',
        title: 'La tua sessione è scaduta',
      }
    );
    if (authResult.verified) {
      this.dismissLockScreen();
    }
  }

  unlock() {
    if (this.password === '1234') {
      this.dismissLockScreen();
    }
  }

  dismissLockScreen() {
    this.modalController.dismiss({reset: true});
  }

}
