import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePage } from './game.page';

const routes: Routes = [
  {
    path: '',
    component: GamePage
  },
  {
    path: 'carta-forbice-sasso-spock-lizard',
    loadChildren: () => import('./../game/carta-forbice-sasso-spock-lizard/carta-forbice-sasso-spock-lizard.module').then(
      m => m.CartaForbiceSassoSpockLizardPageModule)
  },
  {
    path: 'memory',
    loadChildren: () => import('./memory/memory.module').then( m => m.MemoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePageRoutingModule {}
