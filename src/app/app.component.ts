import { appComponentService } from './app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lat: any;
  lon: any;
  map: any;
  date: any;
  options: any;
  weather: any;
  weather1: any;
  weather2: any;
  celcious: any;
  searchValue: any;
  constructor(private weatherService: appComponentService) {}
  ngOnInit(): void {
    this.getWeather();
    this.get5DaysWeather();
    this.interval;
    setInterval(() => {
      this.interval();
    }, 1000);
  }

  interval() {
    this.date = new Date();
  }

  getWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeather(this.lat, this.lon).subscribe((data) => {
          // console.log('data.......................', data);
          this.weather = data;
        });
      });
    }
  }

  get5DaysWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService
          .get5DaysWeather(this.lat, this.lon)
          .subscribe((data) => {
            // console.log('data1.......................', data);
            this.weather1 = data;
          });
      });
    }
  }

  getCity(city: any) {
    this.weatherService.getCity(city).subscribe((data) => {
      this.weather = data;
      this.searchValue = '';
    });
  }
}
