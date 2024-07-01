@extends('site.layouts.app')

@section('title', 'Home')

@section('content')
    <section id="sobre">
        @include('site.components.text-item-1', [ 'texto' => $sobreHome ])
    </section>

    @if(!empty($benefits))
        <section id="vantagens" class="bg-primary">
            <div class="mx-auto flex flex-col max-w-7xl py-9 items-center justify-center">
                <div class="mb-4 flex flex-col items-center">
                    <h2 class="text-xl sm:text-3xl text-primarydark inline-block w-fit font-primary-black text-center leading-tight mb-1">
                        @markdown($vantagensTexto->title)
                    </h2>
                    <div class="text-white text-center">{!! $vantagensTexto->content !!}</div>
                </div>
                <div class="w-full flex flex-wrap justify-center mt-3">
                    @foreach($benefits as $benefit)
                        <div class="w-[280px] px-10 py-5 mx-6 my-2 flex flex-col items-center justify-start flex-wrap text-center bg-primarydark rounded-2xl border-2 border-primarydark hover:bg-transparent hover:border-white/20 duration-200">
                            <img src="{{ asset($benefit->icon) }}" class="w-[40px] h-auto object-contain object-center"/>
                            <h4 class="text-white font-primary-bold text-center mt-4 text-lg leading-[1.1] mb-3">
                                {{ $benefit->title }}
                            </h4>
                            <div class="text-white text-xs">{!! $benefit->text !!}</div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endif

    @if(!empty($plans))
        <section id="planos">
            <div class="mx-auto flex flex-col max-w-7xl py-9 items-center justify-center">
                <div class="mb-4 flex flex-col items-center">
                    <h2 class="text-xl sm:text-3xl text-primary inline-block md:w-[660px] font-primary-black text-center leading-tight mb-1 title-markdown">
                        @markdown($planosTexto->title)
                    </h2>
                </div>
                <div class="w-full flex flex-wrap justify-center mt-3" data-controller="plans-slider">
                    <div class="swiper w-full md:w-[75%]">
                        <div class="swiper-wrapper">
                            @foreach($plans as $plan)
                                <div class="swiper-slide">
                                    <div class="w-full h-[390px] relative">
                                        <div class="py-3 bg-primary">
                                            <h3 class="text-center font-primary-extrabold text-white">{{ $plan->name }}</h3>
                                        </div>
                                        <div>
                                            <div class="font-primary-extrabold text-primary flex flex-row items-end justify-center mt-7 mb-5">
                                                <span class="leading-[1] inline-flex mr-2">R$</span>
                                                <b class="text-5xl font-primary-extrabold leading-[0.9] inline-flex mr-1">{{ $plan->price }}</b>
                                                <span class="inline-flex flex-col">
                                                    <span class="leading-[1.2]">
                                                        ,{{ $plan->price }}
                                                        @if(!empty($plan->obs1))*@endif
                                                    </span>
                                                    <span class="text-[#7C7C7C] font-primary leading-[1]">/mês</span>
                                                </span>
                                            </div>
                                            <div class="text-center text-[#7C7C7C] text-[0.65rem] leading-[1.2] h-[50px]">
                                                {!! $plan->obs1 !!}
                                            </div>
                                        </div>
                                        @if (!empty($plan->items))
                                            <div class="mb-4">
                                                @foreach ($plan->items as $item)
                                                    <div class="flex w-full justify-between border-b border-zinc-200 py-1 last:border-none text-primary text-sm">
                                                        <span>{{ $item->title }}</span>
                                                        <span class="font-primary-extrabold">{{ $item->text }}</span>
                                                    </div>                                        
                                                @endforeach
                                            </div>
                                        @endif
                                        <div class="text-left text-[#7C7C7C] text-[0.65rem] leading-[1.2]">
                                            {!! $plan->obs2 !!}
                                        </div>
                                        @if (!empty($plan->link))
                                            <a href="{{ $plan->link }}" target="_blank" class="absolute left-0 bottom-0 w-full rounded-md bg-secondary text-white font-primary-extrabold flex items-center justify-center leading-[1] mt-5 px-4 py-3 border-b-2 border-secondarydark hover:bg-secondarylight duration-200">
                                                COMPRE AGORA
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="swiper-pagination relative mt-3"></div>
                </div>
                <div class="text-sm text-[#7C7C7C] mt-4">{!! $planosTexto->content !!}</div>
            </div>
        </section>
    @endif

@endsection
