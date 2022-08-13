import { ArchiveService } from './../services/archive.service';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Utensil } from './../model/utensil.model';
import { Tool, Brand } from './../model/tool.model';
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import massiveTools from './../../assets/JSON/tools.json';
import brands from './../../assets/JSON/brands.json';
import { DomSanitizer } from '@angular/platform-browser';
import { addDoc, collection } from '@firebase/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth } from '@angular/fire/auth';
import { User } from '../model/user.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {

  currentUser: User = null;
  utensil: Utensil = {};
  tool: Tool = {
    productDetail: {
      descriptions: []
    },
    brand: {}
  };
  toolForm = false;
  utensilForm = false;
  utensilCard = true;
  toolCard = true;
  showPhoto = false;
  brandsList: Brand[] = [];
  b64photo = '';

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private sanitizer: DomSanitizer,
    private firestore: Firestore,
    private router: Router,
    private afAuth: Auth,
    private archiveService: ArchiveService
  ) {
    for (const a of brands.brands) {
      this.brandsList.push(a);
    }
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user as User;
    });
  }

  showform(bottonType: string) {
    switch (bottonType) {
      case 'tool':
        this.toolForm = true;
        this.utensilForm = false;
        this.toolCard = true;
        this.utensilCard = false;
        break;
      case 'utensil':
        this.toolForm = false;
        this.utensilForm = true;
        this.toolCard = false;
        this.utensilCard = true;
        break;
    }
  }

  addMassiveTools() {
    console.log(massiveTools.tools);
    for (const t of massiveTools.tools) {
      const toolDocRef = collection(this.firestore, 'Tool');
      addDoc(toolDocRef, t);
    }
  }

  async addTool(f: NgForm) {
    const item = f.value;
    item.brand = {};
    item.brand.name = f.value.brandName;
    delete item.brandName;
    item.productDetail = {};
    item.productDetail.shortDescription = f.value.shortDescription;
    delete item.shortDescription;
    if (this.b64photo !== '') {
      item.imageB64 = this.b64photo;
    }
    const loading = await this.loadingController.create();
    await loading.present();
    this.archiveService.addTool(item);
    f.resetForm();
    this.cancel();
    loading.dismiss();
    this.presentAlert('Strumento');
  }

  async addUtensil(f: NgForm) {
    const item: Utensil = f.value;
    if (this.b64photo !== '') {
      item.imageB64 = this.b64photo;
    }
    const loading = await this.loadingController.create();
    await loading.present();
    await this.archiveService.addUtensil(item);
    f.resetForm();
    this.cancel();
    loading.dismiss();
    this.presentAlert('Utensile');
  }

  async addPicture() {
    const image = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: true
    });
    this.b64photo = (this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl)) as any).changingThisBreaksApplicationSecurity;
    this.showPhoto = true;
  }

  removePicture() {
    this.b64photo = '';
    this.showPhoto = false;
  }

  cancel() {
    this.toolForm = false;
    this.utensilForm = false;
    this.toolCard = true;
    this.utensilCard = true;
  }

  backToGarage() {
    this.router.navigate(['/garage']);
  }

  async presentAlert(objectType: string) {
    const alert = await this.alertController.create({
      header: 'Successo',
      subHeader: 'Creazione ' + objectType,
      message: 'Creazione ' + objectType + ' Avvenuta con successo!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
