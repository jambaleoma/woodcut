import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(direction: string) {
    this.router.navigateByUrl(direction);
  }

}
