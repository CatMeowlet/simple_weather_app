<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Libraries\OpenWeather\OWWeather;

class CityController extends Controller
{
    protected $listOfCities;
    public function __construct()
    {
        $this->listOfCities  = json_decode(\Cache::get('cached_japanese_cities'), true);
    }
    public function generalList()
    {
        $cities = $this->listOfCities;
        $citiesDetails = [];
        foreach ($cities as $city => $details) {
            $citiesDetails[$city] = [
                'extra' => $details,
                'openweather' => ['current' => (new OWWeather)->getCurrentByCord($details['lat'],  $details['lon'])],
            ];
        }
        return json_encode($citiesDetails);
    }
    public function listByCurrentBaseWeather()
    {
        $citiesDetails = json_decode(self::generalList(), true);
        $categorizeList = array();
        foreach ($citiesDetails as $city => $details) {
            $categorizeList[$details['openweather']['current']['weather'][0]['main']][$city] = $details;
        }
        return json_encode($categorizeList);
    }
    public function singleCurrentDetails(string $city)
    {
        $single = [];
        $city = ucfirst($city);
        $listOfCities = $this->listOfCities;
        if (key_exists($city, $listOfCities)) {
            $selectedCity = $listOfCities[$city];
            $single[$city] = [
                'extra' => $selectedCity,
                'openweather' => ['current' => (new OWWeather)->getCurrentByCord($selectedCity['lat'], $selectedCity['lon'])],
            ];
        }
        return json_encode($single);
    }
    public function singleGetFullDetails(string $city)
    {
        $city   = ucfirst($city);
        $singleRaw = json_decode(self::singleCurrentDetails($city), true);
        $singleNew = $singleRaw[$city];
        $singleNew['openweather']['forecast'] = (new OWWeather)->getForecast(['lat' => $singleNew['extra']['lat'], 'lon' => $singleNew['extra']['lon']]);
        $singleRaw[$city] = $singleNew;
        return json_encode($singleRaw);
    }
}
