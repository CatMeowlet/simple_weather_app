<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Api\CityController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'index']);
Route::prefix('/api')->name('api.')->group(function () {
    Route::prefix('/weatherapp')->name('weatherapp.')->group(function () {
        Route::get('generalList', [CityController::class, 'generalList']);
        Route::get('listByCurrentBaseWeather', [CityController::class, 'listByCurrentBaseWeather']);
        Route::get('singleCurrentDetails/{city}', [CityController::class, 'singleCurrentDetails']);
        Route::get('singleGetFullDetails/{city}', [CityController::class, 'singleGetFullDetails']);
    });
});
