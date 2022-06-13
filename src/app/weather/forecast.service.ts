import { Injectable } from '@angular/core';
import { filter, map, mergeMap, Observable, of, pluck, switchMap, toArray } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url: string = "https://api.openweathermap.org/data/2.5/forecast";

  constructor(private http: HttpClient) { }

  getForecast(){
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'imperial')
            .set('appid', '2b4b0a32230a1057bd38ff37abd68ed9')
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params }) ),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0 ),
        map( value => {
          return {
            dateString: value.dt_text,
            temp: value.main.temp
          };
        }),
        toArray()
      );
  }

  getCurrentLocation(){
    return new Observable<any>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      )
    })
  }
}


interface OpenWeatherResponse{
  list: {
    dt_text: string;
    main: {
      temp: number;
    }
  }[]
}
