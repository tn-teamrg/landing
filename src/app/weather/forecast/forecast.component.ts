import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecastData: { dateString: string; temp: number; }[] = [];

  constructor(private forecastService: ForecastService) {
    // * NOTE:retrieve weather forecast
    this.forecastService.getForecast()
      .subscribe(forecastData => this.forecastData = forecastData );

    // * NOTE: basic http request to retrieve weather data
    // this.forecastService.getCurrentLocation()
    //   .subscribe(
    //     (coords) => {
    //       console.log(coords);
    //     }
    //   );
  }

  ngOnInit(): void {
    console.log('forecast component have been invoked');
  }

}
