<a href="tel:{{ $geral_inf->phone }}" class="group flex flex-row px-2 sm:px-3 py-2 border-2 rounded-md border-white/20  @if(isset($drawer) and $drawer === true) @else scale-90 @endif" @if(empty($geral_inf->phone)) style="opacity: 0 !important; pointer-events: none !important;" @endif>
    <img src="{{ asset('img/phone.svg') }}" class="opacity-40 w-[26px] sm:w-[30px]"/>
    <div class="text-white flex flex-col ml-1 sm:ml-2">
        <span class="text-xs leading-[1] opacity-90">LIGUE GRÁTIS</span>
        <span class="font-primary-extrabold text-sm sm:text-base leading-[1.2] group-hover:text-secondary duration-200">{{ $geral_inf->phone }}</span>
    </div>
</a>
<a href="https://api.whatsapp.com/send?phone={{ $geral_inf->whatsapp }}" target="_blank" class="rounded-md bg-secondary text-white font-primary-extrabold @if(isset($drawer) and $drawer === true) flex py-4 mt-3 @else hidden sm:flex ml-2 md:ml-3 @endif items-center justify-center text-sm md:text-base leading-[1] px-2 md:px-4 border-b-2 border-secondarydark hover:bg-secondarylight duration-200">
    COMPRE AGORA
</a>