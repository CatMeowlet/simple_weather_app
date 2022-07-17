<div class="p-liveWire--Single">
    @if (!empty($cityDetails))
        @php
            $city = key($cityDetails);
            $cityDetails = $cityDetails[$city];
        @endphp
        <div class="p-liveWire--Single__inner">
            <div class="p-liveWire--Single__left">
                <div class="weather weather--{{ $cityDetails['openweather']['current']['weather'][0]['icon'] }}">
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/{{ $cityDetails['openweather']['current']['weather'][0]['icon'] }}@2x.png"
                            alt="{{ $cityDetails['openweather']['current']['weather'][0]['description'] }}">
                    </div>
                    <p class="description">
                        {{ Str::title($cityDetails['openweather']['current']['weather'][0]['description']) }}
                    </p>
                </div>
            </div>
            <div class="p-liveWire--Single__right">
                <div class="current">
                    <p class="city">{{ $city }}</p>
                    <p class="date"><i class="fa-solid fa-clock"></i>
                        {{ $cityDetails['openweather']['current']['dt'] }}</p>
                    <p class="temperature"><i class="fa-solid fa-temperature-half"></i>
                        {{ $cityDetails['openweather']['current']['main']['temp'] }} {{ config('openweather.unit') }}
                    </p>
                    <p class="humidity"><i class="fa-solid fa-droplet"></i>
                        {{ $cityDetails['openweather']['current']['main']['humidity'] }} %</p>
                    <p class="wind"><i class="fa-solid fa-wind"></i>
                        {{ $cityDetails['openweather']['current']['wind']['speed'] }} meter/sec</p>
                </div>
                <div class="forecast">
                    <p class="heading">Forecast</p>
                    <div class="forecast__track">
                        @foreach ($cityDetails['openweather']['forecast']['list'] as $forecast)
                            <div class="forecast__box">
                                <div class="weather">
                                    <p class="dateTime">{{ $forecast['dt'] }}</p>
                                    <div class="icon">
                                        <img src="https://openweathermap.org/img/wn/{{ $forecast['weather'][0]['icon'] }}@2x.png"
                                            alt="{{ $forecast['weather'][0]['description'] }}">
                                    </div>
                                    <p class="description">{{ $forecast['weather'][0]['description'] }}</p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="u-m-c">
            {{ __('Click card below to view forecast') }}
        </div>
    @endif
</div>
