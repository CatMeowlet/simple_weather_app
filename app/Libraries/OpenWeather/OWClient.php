<?php

namespace App\Libraries\OpenWeather;

use GuzzleHttp\Client;

class OWClient
{
    protected $api_key;
    protected $url = 'https://api.openweathermap.org/data/2.5/';
    protected $geo_api_url = 'http://api.openweathermap.org/geo/1.0/';
    protected $config;
    protected $httpGuzzle;
    protected $units = [
        'c' => 'metric',
        'f' => 'imperial',
        'k' => 'standard',
    ];

    public function __construct()
    {
        self::setConfig();
        self::setApiKey();
    }

    protected function setConfig()
    {
        $this->config = config('openweather');
    }

    protected function setApiKey()
    {
        $this->api_key = $this->config['api_key'];
    }

    private function buildQuery(array $params)
    {
        $params['appid'] = $this->api_key;
        $params['lang']  = $this->config['lang'];
        $params['units'] = $this->units[$this->config['unit']];
        return http_build_query($params);
    }

    public function client($type = null)
    {
        $url = $type == 'geo' ? $this->geo_api_url : $this->url;
        $this->httpGuzzle = new Client([
            'base_uri' => $url,
            'timeout' => 10.0,
        ]);
        return $this;
    }

    public function fetch($route, $params = [])
    {
        try {
            $route = $route . $this->buildQuery($params);
            $response = $this->httpGuzzle->request('GET', $route);
            if ($response->getStatusCode() == 200) {
                return json_decode($response->getBody(), true);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage);
        }
    }
}
