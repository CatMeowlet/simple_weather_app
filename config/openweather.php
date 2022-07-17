<?php
return [
    'api_key' => env('OPEN_WEATHER_MAP_API_KEY', null),
    'date_format' => 'm/d/Y',
    'time_format' => 'h:i A',
    'day_format' => 'l',
    'lang' => 'en',
    'country' => null,
    'unit' => 'c', // default is k so lets set it to Celcius
];
