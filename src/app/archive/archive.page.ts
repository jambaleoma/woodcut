import { ArchiveService } from './../services/archive.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Tool } from 'src/app/model/tool.model';
import { Utensil } from 'src/app/model/utensil.model';
import { ItemService } from 'src/app/services/item.service';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage {

  tools: Tool[] = [];
  utensils: Utensil[] = [];
  showtools = false;
  toolCard = true;
  utensilCard = true;
  toolArchive = false;
  utensilArchive = false;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private itemService: ItemService,
    private archiveService: ArchiveService
  ) { }

  openToolDetails(item: Tool) {
    this.router.navigate(['/dettaglioOggetto']);
    this.itemService.sendIsUtensilChange(null);
    this.itemService.sendIsToolChange(item);
  }

  openUtensilDetails(item: Utensil) {
    this.router.navigate(['/dettaglioOggetto']);
    this.itemService.sendIsToolChange(null);
    this.itemService.sendIsUtensilChange(item);
  }

  showArchive(bottonType: string) {
    switch (bottonType) {
      case 'tool':
        this.getToolsData();
        this.toolCard = true;
        this.utensilCard = false;
        this.toolArchive = true;
        this.utensilArchive = false;
        break;
      case 'utensil':
        this.getUtensilsData();
        this.toolCard = false;
        this.utensilCard = true;
        this.toolArchive = false;
        this.utensilArchive = true;
        break;
      case 'back':
        this.toolCard = true;
        this.utensilCard = true;
        this.toolArchive = false;
        this.utensilArchive = false;
        break;
    }
  }

  async getToolsData() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.archiveService.getToolsData().subscribe(res => {
      this.tools = res;
    });
    loading.dismiss();
  }

  async getUtensilsData() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.archiveService.getUtensilsData().subscribe(res => {
      this.utensils = res;
    });
    loading.dismiss();
  }

  backToGarage() {
    this.router.navigateByUrl('/garage');
  }
}
