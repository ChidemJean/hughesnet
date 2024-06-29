<section class="relative bg-primary">
    <div class="absolute top-0 left-0 z-2 w-full h-[150px] hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon id="blue" points="100 0, 100 30, 0 90, 0 0" fill="white" />
        </svg>
    </div>
    <div class="absolute bottom-0 left-0 z-2 w-full h-[150px] hidden md:block">
        <svg class="-scale-100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon id="blue" points="100 0, 100 30, 0 90, 0 0" fill="white"/>
        </svg>
    </div>
    <div class="relative z-4 mx-auto flex flex-col max-w-7xl py-10 items-center justify-center">
        <div class="w-full flex flex-wrap justify-center">
            <div class="w-full md:w-1/2 text-white flex flex-col md:pr-24 justify-center items-start">
                <b class="text-center md:text-left md:text-2xl">
                    {!! $texto->content !!}
                </b>
                @if(!empty($texto->link))
                    <a href="{{ $texto->link }}" target="_blank">
                        <button type="button" class="flex items-center mt-8 w-fit rounded-[20px] bg-transparent border-2 border-white px-7 py-1 text-center text-lg font-primary-extrabold text-white shadow-sm hover:bg-white hover:text-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            CLIQUE AQUI
                        </button>
                    </a>
                @endif
            </div>
            <div class="w-full md:w-1/2 text-white mt-5 md:mt-0">
                <img src="{{ asset($texto->img) }}" class="w-full h-auto rounded-[20px]"/>
            </div>
        </div>
    </div>
</section>
