import { User } from './../model/user.model';
import { AccessService } from './../services/access.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  currentUser: User = null;

  constructor(
    private router: Router,
    // private afAuth: AngularFireAuth,
    public accessService: AccessService
  ) { }

  goToGarage() {
    this.router.navigateByUrl('/garage');
  }

  goToMeteo() {
    this.router.navigateByUrl('/meteo');
  }

  goToAlarm() {
    this.router.navigateByUrl('/alarm');
  }

  goToGame() {
    this.router.navigateByUrl('/game');
  }

  singOut() {
    this.accessService.signOut();
    this.router.navigateByUrl('/login');
  }

}
