<?php

namespace App\Libraries\OpenWeather;

class OWParsedtime
{
    protected $dateFormat;

    public function __construct()
    {
        $format = config('openweather');
        $this->dateFormat = $format['date_format'] . ' ' . $format['time_format'];
    }

    public function dt(string $timestamp, string $tz)
    {
        return date($this->dateFormat, ($timestamp + $tz));
    }
    public function formatCurrent($res)
    {
        $tz = $res['timezone'];
        // modify date in given format
        $res['sys']['sunrise'] = $this->dt($res['sys']['sunrise'], $tz);
        $res['sys']['sunset'] = $this->dt($res['sys']['sunset'], $tz);
        $res['dt'] =  $this->dt($res['dt'], $tz);
        return $res;
    }
    public function formatForeCast($res)
    {
        $tz = $res['city']['timezone'];
        // modify date in given format
        $res['city']['sunrise'] = $this->dt($res['city']['sunrise'], $tz);
        $res['city']['sunset'] = $this->dt($res['city']['sunset'], $tz);
        // modify date of list data
        foreach ($res['list'] as $key => $val) {
            $res['list'][$key]['dt'] = $this->dt($val['dt'], $tz);
        }
        return $res;
    }
}
