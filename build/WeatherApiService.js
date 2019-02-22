"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = __importStar(require("request"));
var WeatherApiService = /** @class */ (function () {
    function WeatherApiService(apiKey) {
        this._apiKey = apiKey;
    }
    WeatherApiService.prototype.getWeatherByZipcode = function (zipcode, callback) {
        request.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + this._apiKey, function (error, response, body) {
            callback(JSON.parse(body));
        });
    };
    WeatherApiService.prototype.getWeatherByCity = function (city, callback) {
        request.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&appid=' + this._apiKey, function (error, response, body) {
            callback(JSON.parse(body));
        });
    };
    return WeatherApiService;
}());
exports.WeatherApiService = WeatherApiService;
