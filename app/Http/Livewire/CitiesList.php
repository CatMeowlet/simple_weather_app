<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Http;

class CitiesList extends Component
{
    public $citiesList = [];
    public $search = [];
    public function mount()
    {
        $response = Http::accept('application/json')->get('http://weatherapp.test/api/weatherapp/generalList');
        $this->citiesList = json_decode($response, true);
    }
    public function viewDetails($cityLatLong)
    {
        $this->emit('displayDetails', $cityLatLong);
    }
    public function render()
    {
        return view('livewire.cities-list');
    }
}
