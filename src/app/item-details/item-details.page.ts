import { LoadingController, AlertController } from '@ionic/angular';
import { ArchiveService } from './../services/archive.service';
import { Utensil } from './../model/utensil.model';
import { Tool, Brand } from './../model/tool.model';
import { ItemService } from './../services/item.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import brands from '../../assets/JSON/brands.json';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {

  public tool: Tool = {};
  public utensil: Utensil = {};
  public isDesktop: boolean;
  public element: any;
  public brandsList: Brand[] = brands.brands;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private archiveService: ArchiveService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.itemService.getIsToolChange().subscribe(res => {
      this.tool = res;
    });
    this.itemService.getIsUtensilChange().subscribe(res => {
      this.utensil = res;
    });
  }

  ngOnInit() {
    registerLocaleData(localeIt, 'it-IT');
  }

  backToArchive() {
    this.router.navigate(['/archive']);
  }

  showLabelValue(code: string) {
    this.element = document.getElementById(code);
    if (this.element.style.display === 'block') {
      this.element.style.display = 'none';
    } else {
      this.element.style.display = 'block';
    }
  }

  takeBrandLogo(name: string) {
    let base64LogoString = '';
    base64LogoString = this.brandsList.find((b) => b.name === name).logoB64;
    return base64LogoString;
  }

  async deleteUtensil(utensil: Utensil) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.archiveService.deleteUtensil(utensil);
    loading.dismiss();
    this.backToArchive();
    this.presentSuccessAlert('Utensile');
  }

  async deleteTool(tool: Tool) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.archiveService.deleteTool(tool);
    loading.dismiss();
    this.backToArchive();
    this.presentSuccessAlert('Attrezzo');
  }

  async presentConfirmationAlert(obj, objectType) {    
    const alert = await this.alertController.create({
      header: 'Attenzione',
      subHeader: 'Eliminazione ' + objectType,
      message: 'Sei sicuro di voler eliminare questo ' + objectType + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            if (objectType === 'Attrezzo') {
              this.deleteTool(obj);
            } else if (objectType === 'Utensile') {
              this.deleteUtensil(obj);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentSuccessAlert(objectType: string) {
    const alert = await this.alertController.create({
      header: 'Successo',
      subHeader: 'Eliminazione ' + objectType,
      message: 'Eliminazione ' + objectType + ' Avvenuta con successo!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
