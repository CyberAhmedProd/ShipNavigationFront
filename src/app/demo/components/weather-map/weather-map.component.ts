import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../../service/weatherService/weather-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [],
  templateUrl: './weather-map.component.html',
  styleUrl: './weather-map.component.scss'
})
export class WeatherMapComponent implements OnInit {
    private map: any;

  constructor(private weatherService: WeatherServiceService) {}

  ngOnInit(): void {
    this.initMap();
    this.getWeather(51.505, -0.09); // Example coordinates
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private getWeather(lat: number, lon: number): void {
    this.weatherService.getWeather(lat, lon).subscribe(data => {
      console.log(data);
      L.marker([lat, lon])
        .addTo(this.map)
        .bindPopup(`Weather: ${data.weather[0].description}<br>Temperature: ${data.main.temp - 273.15}°C`)
        .openPopup();
    });
  }
}
