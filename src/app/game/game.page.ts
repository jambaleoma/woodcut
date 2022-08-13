import { AccessService } from './../services/access.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {

  constructor(
    private router: Router
    ) {
  }

  navigateTo(direction: string) {
    this.router.navigateByUrl(direction);
  }

}
