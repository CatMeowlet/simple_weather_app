<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Http;

class CityDetails extends Component
{
    public $param;
    public $cityDetails;

    protected $listeners = ['displayDetails'];

    public function displayDetails($cityLatLong)
    {
        $this->param = explode('|', $cityLatLong);
        $response = Http::accept('application/json')->get('http://weatherapp.test/api/weatherapp/singleGetFullDetails/' . $this->param[0]);
        $this->cityDetails = json_decode($response, true);
    }
    public function render()
    {
        return view('livewire.city-details', ['cityDetails' => $this->cityDetails]);
    }
}
