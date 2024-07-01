<div class="mx-auto flex flex-wrap justify-center max-w-7xl py-10">
    @if(!empty($texto->img))
        <div class="w-full md:w-1/2">
            <div class="w-full h-auto aspect-square rounded-[20px] bg-primarydark">
                <img src="{{ asset($texto->img) }}" class="w-full object-contain object-center scale-110"/>
            </div>
        </div>
    @endif
    <div class="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-16 mt-4 md:mt-0">
        @if(!empty($texto->subtitle))
            <h6 class="text-lg sm:text-xl text-secondary">{{ $texto->subtitle }}</h6>
        @endif
        <h2 class="text-xl sm:text-3xl text-primary font-primary-black leading-tight mb-4">
            {{ $texto->title }}
        </h2>
        <div>
            {!! $texto->content !!}
        </div>
        @if(!empty($texto->link))
            <a href="{{ $texto->link }}">
                @if(strpos($texto->link, 'whatsapp') !== false)
                    <button type="submit" class="flex items-center w-fit rounded-md bg-[#069B1E] px-5 py-2 mt-5 text-center text-lg font-primary-bold text-white shadow-sm hover:saturate-200 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <img src="{{ asset('img/whatsapp.svg') }}" class="w-[25px] inline-block mr-3"/>
                        Quero ter Internet
                    </button>
                @else
                    <button type="submit" class="block w-fit rounded-md bg-primary px-7 py-1 mt-5 text-center text-lg font-primary-bold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        SAIBA MAIS
                    </button>
                @endif
            </a>
        @endif
    </div>
</div>
