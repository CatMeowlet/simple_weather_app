<?php

namespace App\Libraries\OpenWeather;

class OWWeather
{
    /**
     * URL LIST
     *
     * @var string
     */
    protected $current  = 'weather?';
    protected $forecast = 'forecast?';

    private function getCurrent(array $query)
    {
        $data = (new OWClient)->client()->fetch($this->current, $query);
        return (new OWParsedtime())->formatCurrent($data);
    }
    public function getCurrentByCord(string $lat, string $lon)
    {
        return $this->getCurrent([
            'lat' => $lat,
            'lon' => $lon,
        ]);
    }
    public function getForecast(array $coordinates)
    {
        $data = (new OWClient)->client()->fetch($this->forecast, $coordinates);
        return (new OWParsedtime())->formatForeCast($data);
    }
}
