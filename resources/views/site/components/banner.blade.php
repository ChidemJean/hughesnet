@if(isset($banners) && !empty($banners))
    <div class="lg:h-[620px] md:h-[500px] h-[300px]" data-controller="banner-slider">
        <div class="relative flex h-full w-full">
            <div class="swiper w-full">
                <div class="swiper-wrapper">
                    @foreach($banners as $banner)
                        <div class="swiper-slide relative">
                            <img src="{{ asset($banner->background_img) }}" class="w-full h-full absolute z-0 object-cover object-center hidden lg:block"/>
                            <img src="{{ asset($banner->background_img_tablet) }}" class="w-full h-full absolute z-0 object-cover object-center block lg:hidden"/>
                            <img src="{{ asset($banner->background_img_mobile) }}" class="w-full h-full absolute z-0 object-cover object-center block md:hidden"/>
                            <div class="z-10 relative max-w-7xl w-full h-full mx-auto flex items-center justify-end">
                                <div class="w-[350px] hidden">
                                    <b class="text-white font-black font-primary-black text-4.5xl leading-tight drop-shadow-banner-text">{{ $banner->title }}</b>
                                    @if(!empty($banner->text))
                                        <div>
                                            {!! $banner->text !!}
                                        </div>
                                    @endif
                                    @if(!empty($banner->link))
                                        <a href="{{ $banner->link }}">
                                            <button type="button" class="block w-fit rounded-[20px] bg-primary px-7 py-1 mt-5 text-center text-sm font-primary-extrabold text-white shadow-sm hover:bg-primarylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                                SAIBA MAIS
                                            </button>
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
@endif
