import { Router } from '@angular/router';
import { OpenweatherService } from './../services/openweather.service';
import { AccessService } from './../services/access.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ajax } from 'rxjs/ajax';

import { Plugins } from '@capacitor/core';
import { city } from '../model/city.model';
import { Coord } from '../model/coord.model';
import cities from './../../assets/JSON/cityList.json';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Geolocation } = Plugins;

declare let google;

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})
export class MeteoPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  city: string;
  description: string;
  iconDescription: string;
  sunSet: number;
  sunRise: number;
  citySelected = false;
  cities: city[] = [];
  citiesSearch: city[] = [];
  map: any;
  markers = [];

  constructor(
    private openWheatherService: OpenweatherService,
    private router: Router) { }

  ngOnInit() {
    this.cities = cities.cities.map(c => ({
      name: c.name
    }));
  }

  loadMap(coord: Coord) {

    const latLng = new google.maps.LatLng(coord.lat, coord.lon);

    const mapOptions = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.markers.map(m => m.setMap(null));
    this.markers = [];

    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map
    });

    this.markers.push(marker);
  }

  searchCity($event) {
    this.citiesSearch = this.cities.filter((c) => c.name.match($event.target.value));
    this.city = null;
    this.citySelected = false;
  }

  checkCity($event) {
    this.city = $event.target.value;
    if (this.citiesSearch.length > 0 && this.city) {
      this.citySelected = true;
    } else {
      this.citySelected = false;
    }
    if (this.city) {
      const wheatherOfCitySerch = ajax(this.openWheatherService.getWheatherAPI().concat(
        '?q=' + this.city + ',it&APPID=' + this.openWheatherService
      .getWheatherAPIToken() + '&units=metric&lang=it'));

      const subscribe = wheatherOfCitySerch.subscribe(
        res => {
          this.sunRise = res.response.sys.sunrise;
          this.sunSet = res.response.sys.sunset;
          this.description = res.response.weather[0].description;
          this.iconDescription = res.response.weather[0].icon;
          this.loadMap(res.response.coord);
        },
        err => console.error(err)
      );
    }
  }

  navigateTo(direction: string) {
    this.router.navigateByUrl(direction);
  }

}
