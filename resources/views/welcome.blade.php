@extends('layouts._app')
@section('content')
    <section class="weatherApp">
        <div class="l-wrap">
            <div class="l-row l-row--nomargin l-row--column">
                <livewire:city-details />
                <livewire:cities-list />
            </div>
        </div>
    </section>
@endsection
