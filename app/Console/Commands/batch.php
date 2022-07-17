<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class batch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'batch:cache {--limit=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $options    = $this->options();
        $response   = $this->fetchApi($options['limit'] ?? 5);
        $decoded    = json_decode($response->getBody(), true);
        $pairedKeys = $this->pairCityAndPlaceId($decoded['features']);

        $this->cacheTestData($pairedKeys);
        return 0;
    }

    public function fetchApi($limit = 5)
    {
        $baseUrl = 'https://api.geoapify.com/v2/places';
        $response = Http::accept('application/json')
            ->get($baseUrl, [
                'categories' => 'administrative.city_level', // assume we only want japan city
                'filter' => 'place:51754d6407e217614059d7badc5abd144240f00101f90169d5050000000000c0020b920306e697a5e69cac', // assume we only want japan
                'limit' => $limit,
                'apiKey' => '9cdaee746cb34828a3713baea4cd15f0'
            ]);
        return $response;
    }

    public function pairCityAndPlaceId($data)
    {
        $new = [];
        foreach ($data as $el) {
            $new[$el['properties']['city']] =
                [
                    'geoapifyId' => $el['properties']['place_id'],
                    'lon' =>  $el['properties']['lon'],
                    'lat' =>  $el['properties']['lat'],
                ];
        }
        return $new;
    }
    public function cacheTestData(array $data)
    {
        \Cache::forever('cached_japanese_cities', json_encode($data));
    }
}
