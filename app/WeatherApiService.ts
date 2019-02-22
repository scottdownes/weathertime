import * as request from 'request';

export class WeatherApiService {
  private _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  getWeatherByZipcode(zipcode: string, callback: (weatherInfo: any) => any) {
    request.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + this._apiKey, (error: any, response: any, body: any) => {
        callback(JSON.parse(body));
    });
  }

  getWeatherByCity(city: string, callback: (weatherInfo: any) => any) {
    request.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&appid=' + this._apiKey, (error: any, response: any, body: any) => {
        callback(JSON.parse(body));
    });
  }
}
