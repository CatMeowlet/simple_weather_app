# Weather App

### Requirement
* Laravel v9
* PHP v8.13


### Start
To start the project please run the command below after the laravel is setup.

```sh
    php artisan batch:cache --limit=:number
```
This will cache __N__ of cities in Japan. Reference api : __https://api.geoapify.com/v2/places__

### Additional Information

If broken UI or missing UI please refer to __README.dev.md__

### Expected Content
* Home - list of cities w/ weather data for today and single city w/ today + forecasted weather data.
* API - accessible through __/api/weatherapp/**__. Note: __geoapify api and openweather api__ is consume in api listed below.
   - __generalList__ - return list of cities w/ __city, geoapifyId, latitude, and longitude coord__
   - __listByCurrentBaseWeather__ - return categorize list of cities by it's weather base status (rain,sunny, and etc.) w/ __city, geoapifyId, latitude, longitude, and openweather related data__
   - __singleCurrentDetails/{city}__ - param can be access through __generalList__ or __listByCurrentBaseWeather__. return single city /w current weather data.
    - __singleGetFullDetails/{city}__ - param can be access through __generalList__ or __listByCurrentBaseWeather__. return single city /w current weather data and forecasted data.
