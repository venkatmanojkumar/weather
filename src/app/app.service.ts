import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class appComponentService {
  apiUrl: string = environment.apiUrl;
  apiKey = 'a881e0a4654b11d641b53b1803dfaa8d';
  constructor(private httpClient: HttpClient) {}

  getWeather(lat: any, lon: any) {
    let params = new HttpParams();
    params = params
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('appid', this.apiKey);
    let req = this.httpClient.get(`${this.apiUrl}/weather`, { params });
    return req;
  }

  get5DaysWeather(lat: any, lon: any) {
    let params = new HttpParams();
    params = params
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'imperial')
      .set('appid', this.apiKey);
    let req = this.httpClient.get(`${this.apiUrl}/forecast`, { params });
    return req;
  }

  getWeatherCity(city: string) {
    let params = new HttpParams();
    params = params
      .set('q', city)
      .set('units', 'imperial')
      .set('appid', this.apiKey);
    let req = this.httpClient.get(`${this.apiUrl}/weather`, { params });
    return req;
  }

  get5DaysWeatherCity(city: any) {
    let params = new HttpParams();
    params = params
      .set('q', city)
      .set('units', 'imperial')
      .set('appid', this.apiKey);
    let req = this.httpClient.get(`${this.apiUrl}/forecast`, { params });
    return req;
  }
}
