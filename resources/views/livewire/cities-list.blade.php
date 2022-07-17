<div class="p-liveWire" wire:poll.120s>
    <div class="p-liveWire__inner">
        @foreach ($citiesList as $city => $details)
            <div class="p-liveWire--Weather"
                wire:click="viewDetails('{{ $city . '|' . $details['extra']['lat'] . '|' . $details['extra']['lon'] }}')">
                <div class="p-liveWire--Weather__inner">
                    <div class="p-liveWire--Weather__left">
                        <div class="icon">
                            <img src="https://openweathermap.org/img/wn/{{ $details['openweather']['current']['weather'][0]['icon'] }}@2x.png"
                                alt="{{ $details['openweather']['current']['weather'][0]['description'] }}">
                        </div>
                        <p class="description">
                            {{ Str::title($details['openweather']['current']['weather'][0]['description']) }}
                        </p>
                    </div>
                    <div class="p-liveWire--Weather__right">
                        <p class="place">
                            {{ Str::ucfirst($city) }}
                        </p>
                        <div class="time">
                            <span class="icon">
                                <i class="fa-solid fa-clock"></i>
                            </span>
                            <span>{{ $details['openweather']['current']['dt'] }}</span>
                        </div>
                        <div class="temperature">
                            <span class="icon">
                                <i class="fa-solid fa-temperature-half"></i>
                            </span>
                            <span>
                                {{ $details['openweather']['current']['main']['temp'] . ' ' . config('openweather.unit') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
