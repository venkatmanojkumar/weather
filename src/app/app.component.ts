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
  date: any;
  weather: any;
  weather1: any;
  isLoading: boolean = false;
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
          this.weather = data;
          this.isLoading = false;
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
            console.log('data1.......................', data);
            this.weather1 = data;
            this.isLoading = false;
          });
      });
    }
  }

  getWeatherCity(city: any) {
    this.weatherService.getWeatherCity(city).subscribe((data) => {
      this.weather = data;
      this.searchValue = '';
    });
  }

  get5DaysWeatherCity(city: any) {
    this.weatherService.get5DaysWeatherCity(city).subscribe((data) => {
      this.weather1 = data;
      this.searchValue = '';
    });
  }
}
