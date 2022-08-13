import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  OPENWEATHERAPI = 'https://api.openweathermap.org/data/2.5/weather'
  TOKEN = '95b05a3d3af2ca404aabdc0e95c4367f'

  constructor() { }

  getWheatherAPI() {
    return this.OPENWEATHERAPI;
  }

  getWheatherAPIToken() {
    return this.TOKEN;
  }

}
