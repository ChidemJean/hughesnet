<div class="mx-auto flex flex-wrap justify-center max-w-7xl py-10">
    @if(!empty($texto->img))
        <img src="{{ asset($texto->img) }}" class="w-full md:w-2/5 h-auto rounded-[20px]"/>
    @endif
    <div class="w-full md:w-2/5 flex flex-col justify-center pl-0 md:pl-10 mt-4 md:mt-0">
        @if(!empty($texto->subtitle))
            <h6 class="text-xl text-secondary">{{ $texto->subtitle }}</h6>
        @endif
        <h2 class="text-3xl text-primary font-primary-black leading-tight mb-4">
            {{ $texto->title }}
        </h2>
        <div>
            {!! $texto->content !!}
        </div>
        @if(!empty($texto->link))
            <a href="{{ $texto->link }}">
                <button type="submit" class="block w-fit rounded-[20px] bg-primary px-7 py-1 mt-5 text-center text-sm font-primary-extrabold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    SAIBA MAIS
                </button>
            </a>
        @endif
    </div>
</div>
