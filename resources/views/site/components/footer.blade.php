<footer class="relative py-14 bg-primarylight mt-0">
    <div class="relative z-2 mx-auto flex-col gap-4 md:gap-0 md:flex-row flex flex-wrap max-w-7xl items-center justify-between">
        <div class="flex flex-col items-center text-center">
            <img src="{{ asset('img/logo.png') }}" class="w-52 max-w-full"/>
            <div class="mx-auto text-center h-fit text-white">
                {!! $textoRodape !!}
            </div>
        </div>
        <a href="tel:{{ $geral_inf->phone }}" class="group flex flex-row" @if(empty($geral_inf->phone)) style="opacity: 0 !important; pointer-events: none !important;" @endif>
            <img src="{{ asset('img/phone.svg') }}" class="opacity-40 w-[30px]"/>
            <div class="text-white flex flex-col ml-2">
                <span class="text-xs leading-[1] opacity-90">Central de vendas</span>
                <span class="font-primary-extrabold text-base leading-[1.2] group-hover:text-secondary duration-200">{{ $geral_inf->phone }}</span>
            </div>
        </a>
        <a href="https://api.whatsapp.com/send?phone={{ $geral_inf->whatsapp }}" target="_blank" class="text-white hover:text-[#24CC64] duration-200 font-primary-bold flex items-center justify-center leading-[1] px-4">
            <img src="{{ asset('img/whatsapp.svg') }}" class="w-[25px] inline-block mr-3"/>    
            Compre pelo WhatsApp
        </a>
    </div>
</footer>
