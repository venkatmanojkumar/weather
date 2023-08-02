import { Component, OnInit } from '@angular/core';
import { appComponentService } from './app.service';
import * as Leaflet from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  celcious: any;
  date = new Date();
  map: any;
  markers: Leaflet.Marker[] = [];
  options: any;
  center: any;
  constructor(private weatherService: appComponentService) {}
  ngOnInit(): void {
    this.getWeather();
    // this.initMap();
  }

  getWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeather(this.lat, this.lon).subscribe((data) => {
          console.log('data.......................', data);
          this.weather = data;
          let faren = this.weather.main.temp;
          this.celcious = (5 / 9) * (faren - 32);
        });
      });
    }
  }

  // initMap(): void {
  //   this.map = L.map('map').setView([this.lat, this.lon], 8);
  //   console.log(this.map);

  //   const tiles = L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       attribution:
  //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     }
  //   ).addTo(this.map);

  //   tiles.addTo(this.map);

  //   (L.Control as any).geocoder().addTo(this.map);
  // }

  getCity(city: any) {
    this.weatherService.getCity(city).subscribe((data) => {
      this.weather = data;
    });
  }
}
