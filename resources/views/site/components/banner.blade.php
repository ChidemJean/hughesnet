@if(isset($banners) && !empty($banners))
    <div class="lg:h-[480px] md:h-[500px] h-[300px]" data-controller="banner-slider">
        <div class="relative flex h-full w-full">
            <div class="swiper w-full">
                <div class="swiper-wrapper">
                    @foreach($banners as $banner)
                        <div class="swiper-slide relative">
                            <img src="{{ asset($banner->background_img) }}" class="w-full h-full absolute z-0 object-cover object-center hidden lg:block"/>
                            <img src="{{ asset($banner->background_img_tablet) }}" class="w-full h-full absolute z-0 object-cover object-center block lg:hidden"/>
                            <img src="{{ asset($banner->background_img_mobile) }}" class="w-full h-full absolute z-0 object-cover object-center block md:hidden"/>
                            @if(!empty($banner->link))
                                <a href="{{ $banner->link }}" class="w-full h-full absolute left-0 top-0 z-10"></a>
                            @endif
                        </div>
                    @endforeach
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
@endif
