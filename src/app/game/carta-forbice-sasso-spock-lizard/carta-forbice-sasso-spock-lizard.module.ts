import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaForbiceSassoSpockLizardPageRoutingModule } from './carta-forbice-sasso-spock-lizard-routing.module';

import { CartaForbiceSassoSpockLizardPage } from './carta-forbice-sasso-spock-lizard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaForbiceSassoSpockLizardPageRoutingModule
  ],
  declarations: [CartaForbiceSassoSpockLizardPage]
})
export class CartaForbiceSassoSpockLizardPageModule {}
