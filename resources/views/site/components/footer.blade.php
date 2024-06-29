<footer class="relative py-14 bg-primarylight mt-0">
    <div class="relative z-2 mx-auto flex flex-wrap max-w-7xl items-center justify-center">
        <div class="flex flex-col items-center text-center">
            <img src="{{ asset('img/logo.png') }}" class="w-80 max-w-full"/>
            <div class="w-full md:w-auto text-white">
                <div class="my-5 flex justify-center md:justify-start">
                    <a href="https://www.facebook.com/MaisEnsinoMaisFormacao/" target="_blank" class="text-sm w-8 h-8 mr-2 inline-flex items-center justify-center rounded-full border border-white font-semibold leading-6 text-white hover:bg-white hover:text-black transition"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/maisensinomaisformacao/" target="_blank" class="text-sm w-8 h-8 mr-2 inline-flex items-center justify-center rounded-full border border-white font-semibold leading-6 text-white hover:bg-white hover:text-black transition"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCaWz5SlkCIriOfLX2DvNzhw" target="_blank" class="text-sm w-8 h-8 mr-4 inline-flex items-center justify-center rounded-full border border-white font-semibold leading-6 text-white hover:bg-white hover:text-black transition"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="w-[480px] max-w-[90vw] mx-auto text-center h-fit text-white">
                {!! $textoRodape->content !!}
            </div>
        </div>
    </div>
</footer>
