<header class="fixed w-full z-50 backdrop-saturate-200 top-0 left-0">
    <div class="absolute w-full h-full bg-[#01155b] opacity-70 pointer-events-none z-20"></div>  <!--@if (!empty($page) && $page->color) style="background: {{ $page->color }}" @endif-->
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-9 relative z-30" aria-label="Global">
        <div class="flex lg:flex-1">
            <a href="{{ route('home') }}" class="-m-1.5 p-1.5 hover:opacity-70 transition">
                <span class="sr-only">{{ env('APP_NAME') }}</span>
                <img class="w-48 h-auto" src="{{ asset('img/logo.png') }}" alt="">
            </a>
        </div>
        <div class="flex">
            <button type="button"
                class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 toggle-menu-mobile">
                <span class="sr-only">Abrir menu</span>
                <svg class="h-6 w-6 fill-white stroke-white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
    </nav>
</header>
@include('site.components.header-mobile')
