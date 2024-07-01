<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @section('metatags')
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ env('DOMAIN') }}" />
        <meta property="og:title" content="{{ env('COMPANY_TITLE') }}" />
        <meta property="og:description" content="{{ env('COMPANY_DESCRIPTION') }}" />
        <meta property="og:image" content="{{ env('DOMAIN') }}img/_layout/logo.png" />
        <meta property="og:image:width" content="333" />
        <meta property="og:image:height" content="90" />
        <meta property="og:site_name" content="{{ env('DOMAIN') }}" />
        <meta property="og:locale" content="pt_BR" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="{{ env('COMPANY_DESCRIPTION') }}" />
        <meta name="twitter:title" content="{{ env('COMPANY_TITLE') }}" />
        <meta name="twitter:image" content="{{ env('DOMAIN') }}img/_layout/logo.png" />
    @endsection

    <meta name="author" content="{{ env('COMPANY_NAME') }}" />
    <meta name="Publisher" content="{{ env('COMPANY_NAME') }}" />
    <meta name="owner" content="{{ env('COMPANY_NAME') }}" />
    <meta name="copyright" content="{{ env('COMPANY_NAME') }}" />
    <meta name="description" content="{{ $geral_inf->meta_description ?? env('COMPANY_DESCRIPTION') }}" />
    <meta name="keywords" content="{{ env('KEY_WORDS') }}" />
    <meta name="robots" content="index,follow" />
    <meta name="rating" content="General" />

    <title>
        @yield('title', 'Home') | {{ env('APP_NAME') }}
    </title>

    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/favicon-site/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon-site/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon-site/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('img/favicon-site/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('img/favicon-site/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    @vite(['resources/js/site/site.jsx'])
</head>

<body class="antialiased text-lg">
    @include('site.components.header')
    <main class="mt-[86.6px] md:mt-0">
        @if (request()->routeIs('home'))
            @include('site.components.banner')
        @endif
        @yield('content')
    </main>
    <x-footer />
    <a href="https://api.whatsapp.com/send?phone={{ $geral_inf->whatsapp }}" target="_blank" class="rounded-full flex items-center justify-center w-[54px] h-[54px] fixed bottom-[30px] right-[30px] z-50 hover:saturate-200 duration-300 bg-[#24CC64]">
        <img src="{{ asset('img/whatsapp.svg') }}" class="w-[55%]"/>
    </a>
</body>

</html>
