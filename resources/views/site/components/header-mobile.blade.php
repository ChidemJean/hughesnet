
<div class="hidden translate-x-0"></div>
<div class="hidden group z-[9999]" role="dialog" aria-modal="true" data-controller="header-mobile">
    <div class="fixed inset-0 z-[9999] opacity-0 transition bg-black group-[:not(.hidden)]:opacity-80" data-header-mobile-target="bg"></div>
    <div class="fixed inset-y-0 right-0 z-[99999] w-full overflow-y-auto bg-[#01155b] p-0 sm:ring-1 sm:ring-gray-900/10 duration-200"
        data-header-mobile-target="content"
        data-transition:enter="transition ease-out duration-200"
        data-transition:enter-start="opacity-0 -translate-y-10"
        data-transition:enter-end="!opacity-100 !translate-y-0"
        data-transition:leave="transition ease-in duration-150"
        data-transition:leave-start="opacity-100 translate-y-0"
        data-transition:leave-end="!opacity-0 !-translate-y-10"
    >
        {{-- <img src="{{ asset('img/_layout/natureza-morta-com-a-balanca-da-justica.jpg') }}" class="absolute z-10 w-full h-full object-center object-cover grayscale opacity-10"/> --}}
        <div class="w-[1300px] max-w-full px-6 py-7 mx-auto relative z-20">
            <div class="flex items-center justify-between">
                <a href="{{ route('home') }}" class="-m-1.5 p-1.5">
                    <span class="sr-only">{{ getenv('APP_NAME') }}</span>
                    <img class="h-[90px] md:h-[150px] w-auto brightness-0 invert" src="{{ asset('img/logo.png') }}" alt="">
                </a>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-white hover:opacity-70 duration-300" data-action="header-mobile#close">
                    <span class="sr-only">Close menu</span>
                    <svg class="h-6 w-6 md:w-12 md:h-12" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" class="fill-white"/>
                    </svg>
                </button>
            </div>
            <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                    <div class="space-y-2 py-8 menu-mob">
                        <a href="{{ route('home') }}" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Home</a>
                        <a href="{{ route('home') }}#about" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Sobre Nós</a>
                        <a href="{{ route('home') }}#experiencias" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Serviços</a>
                        <a href="{{ route('home') }}#conquistas" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Nossas Conquistas</a>
                        <a href="{{ route('blog') }}" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Blog</a>
                        <a href="{{ route('home') }}#contact" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Fale Conosco</a>
                        <a href="{{ route('home') }}#depoimentos" class="-mx-3 block rounded-lg py-2 px-3 text-2xl font-primary-bold leading-7 text-white hover:bg-black/10 hover:text-primarylight">Depoimentos</a>
                    </div>
                </div>
            </div>
            <div class="flex flex-row items-center mt-12 justify-center md:justify-start">
                <a href="https://www.facebook.com/MaisEnsinoMaisFormacao/" target="_blank" class="flex items-center justify-center text-white hover:text-primarylight mr-4 bg-transparent rounded-full duration-200 text-xl">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/maisensinomaisformacao/" target="_blank" class="flex items-center justify-center text-white hover:text-primarylight mr-4 bg-transparent rounded-full duration-200 text-xl">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCaWz5SlkCIriOfLX2DvNzhw" target="_blank" class="flex items-center justify-center text-white hover:text-primarylight mr-4 bg-transparent rounded-full duration-200 text-xl">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    </div>
</div>
