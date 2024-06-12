import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

    private apiKey = 'c375756c3361379088e3c07b09ef73a9';
    private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    constructor(private http: HttpClient) {}

    getWeather(lat: number, lon: number): Observable<any> {
      return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
    }
    LoadForecastWeather(zip: any): Observable<any> {
        return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=35.8254&lon=10.637&,us&APPID=${this.apiKey}` );
      }

      LoadCurrentWeather(zip: any): Observable<any> {
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=35.8254&lon=10.637&,us&APPID=${this.apiKey}&units=imperial` );
      }
}
