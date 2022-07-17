<?php

namespace App\Libraries\GeoApify;

use GuzzleHttp\Client;

class GAClient
{
    protected $api_key;

    protected $url = 'https://api.geoapify.com/v2/places/';
    protected $details_api_url = 'https://api.geoapify.com/v2/place-details';

    protected $limit = 1;
    protected $config;
    protected $httpGuzzle;
    protected $categories = 'administrative.city_level';

    public function __construct()
    {
        self::setConfig();
        self::setApiKey();
    }

    protected function setConfig()
    {
        $this->config = config('geoapify');
    }

    protected function setApiKey()
    {
        $this->api_key = $this->config['api_key'];
    }

    private function buildQuery(array $params)
    {
        $params['apiKey'] = $this->api_key;
        $params['limit']  = $this->limit;
        return http_build_query($params);
    }

    public function client($type = null)
    {
        $url = $type == 'details' ? $this->details_api_url : $this->url;
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
