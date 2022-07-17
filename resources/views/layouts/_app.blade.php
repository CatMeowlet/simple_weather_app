<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('release/mini/style.css') }}" />
    <link rel="stylesheet" href="{{ asset('release/mini/page/top.css') }}" />
    <link rel="stylesheet" href="{{ asset('release/mini/font/iconfont.css') }}" />
    @yield('css')
    <script defer src="https://unpkg.com/alpinejs@3.10.2/dist/cdn.min.js"></script>
    @livewireStyles
</head>

<body class="page">

    @include('layouts.includes._header')
    <main class="page__center">
        <!-- content start here -->
        @yield('content')
        <!-- content end here -->
    </main>
    <footer class="page__footer">
        @include('layouts.includes._footer')
    </footer>
    @livewireScripts
</body>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="{{ asset('release/ugly/all.js') }}"></script>
@yield('script')

</html>
