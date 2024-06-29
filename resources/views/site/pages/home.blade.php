@extends('site.layouts.app')

@section('title', 'Home')

@section('content')
    @empty($sobreHome)
    @else
        <section id="about" class="py-16 bg-gradient">
            <div class="mx-auto flex flex-wrap max-w-7xl items-center justify-between">
                <div class="w-full md:w-2/5 mb-8 md:mb-0">
                    <hr class="w-[80px] h-[12px] mb-3 bg-white rounded-sm"/>
                    <h2 class="text-5xl text-white font-primary-black leading-none mb-5">{{ $sobreHome->title }}</h2>
                    <div class="mb-5 text-white">
                        {!! $sobreHome->content !!}
                    </div>
                    @if(!empty($sobreHome->img))
                        <img src="{{ asset($sobreHome->img) }}" class="w-[140px] max-w-full h-auto rounded-[20px]"/>
                    @endif
                </div>
                <div class="w-full md:w-2/5">
                    <div class="swiper relative" data-controller="slider-equipe">
                        <div class="swiper-wrapper">
                            @foreach($persons as $person)
                                <div class="swiper-slide">
                                    <div class="w-full h-[460px] relative rounded-md overflow-hidden group">
                                        <img src="{{ asset($person->photo) }}" class="w-full h-full object-cover mb-3 z-10"/>
                                        @if ($person->presentation)
                                            <div class="top-0 left-0 w-full h-full p-5 absolute text-white bg-primary/70 opacity-0 duration-200 group-hover:opacity-100 group-hover:backdrop-blur-sm">{!! $person->presentation !!}</div>
                                        @endif
                                    </div>
                                    <h3 class="text-white font-primary-extrabold text-xl mt-3">{{ $person->name }}</h3>
                                    <p class="text-white">{{ $person->assignment }}</p>
                                </div>
                            @endforeach
                        </div>
                        <div class="swiper-button-prev after:!hidden !absolute !bottom-0 !right-10 !left-auto !top-auto hover:opacity-60 duration-300">
                            <img src="{{ asset('img/arrow_white.png') }}" class="rotate-180"/>
                        </div>
                        <div class="swiper-button-next after:!hidden !absolute !bottom-0 !right-0 !left-auto !top-auto hover:opacity-60 duration-300">
                            <img src="{{ asset('img/arrow_white.png') }}" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endempty

    @empty($experienciasTexto)
    @else
        <section id="experiencias" class="py-8">
            <div class="mx-auto flex flex-wrap max-w-7xl items-center justify-between">
                <hr class="w-[80px] h-[12px] mb-5 bg-primary mx-auto rounded-sm"/>
                <h2 class="text-5xl text-primary font-primary-black text-center w-full leading-none mb-5">{{ $experienciasTexto->title }}</h2>
            </div>
        </section>
        <x-pages-items />
    @endempty

    @empty($conquistasTexto)
    @else
        <section id="conquistas" class="pt-10 bg-[#E2F3F6] relative">
            <div class="mx-auto flex flex-wrap max-w-7xl pb-56 items-center justify-between relative z-20">
                <hr class="w-[80px] h-[12px] mb-5 bg-primary mx-auto rounded-sm"/>
                <h2 class="text-5xl text-primary font-primary-black text-center w-full leading-none mb-5">{{ $conquistasTexto->title }}</h2>
                @if($conquistasTexto->img)
                    <img src="{{ $conquistasTexto->img }}" class="absolute bottom-0 left-1/2 -translate-x-1/2 md:max-w-[400px] max-w-full hidden md:block"/>
                @endif
                <div class="flex justify-between w-[820px] max-w-full mx-auto mt-10 relative z-30">
                    @foreach(array_chunk($numbers, ceil(count($numbers)/2)) as $chunk)
                        <div class="@if($loop->even) text-right @endif">
                            @foreach($chunk as $number)
                                <div class="mb-6">
                                    <h4 class="font-primary-black text-5xl text-primary" data-controller="number" data-to="{{ $number['number'] }}">0</h4>
                                    <p class="text-primary text-3xl">{{ $number['title'] }}</p>
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>
            </div>
            <img src="{{ asset('img/waves_half.png') }}" class="absolute bottom-0 left-[calc(46%)] -translate-x-1/2 z-10"/>
        </section>
    @endempty

    <x-video-comp />

    <x-contact-form />

    @empty($depoimentosTexto)
    @else
        <section id="depoimentos" class="pt-10 pb-16 bg-[#E2F3F6] relative overflow-hidden">
            <div class="mx-auto flex flex-wrap max-w-7xl items-center justify-between">
                <hr class="w-[80px] h-[12px] mb-5 bg-[#1BA4FF] mx-auto rounded-sm"/>
                <h2 class="text-5xl text-[#1BA4FF] font-primary-black text-center w-full leading-none mb-5">{{ $depoimentosTexto->title }}</h2>
                <div class="flex justify-center w-full flex-wrap mx-auto mt-10 relative z-30" data-controller="slider-testimonies">
                    <div class="swiper !overflow-visible !w-full">
                        <div class="swiper-wrapper">
                            @foreach($testimonies as $testimony)
                                <div class="swiper-slide">
                                    {{-- <div class="shadow-2xl bg-white rounded-md px-6 py-4 w-full">
                                        <div class="mx-auto mb-4 w-[150px] h-[150px] rounded-full overflow-hidden bg-primary/10">
                                            <img src="{{ asset($testimony->photo) }}" class="w-full h-full object-cover object-center" />
                                        </div>
                                        <div class="text-center text-zinc-500 mb-4 text-base">
                                            {!! $testimony->text !!}
                                        </div>
                                        <h4 class="font-primary-extrabold text-center text-xl text-zinc-500">{{ $testimony->name }}</h4>
                                        <p class="text-zinc-500 text-lg text-center">{{ $testimony->assignment }}</p>
                                    </div> --}}
                                    <div class="shadow-2xl bg-white rounded-md overflow-hidden w-full h-[260px]">
                                        <iframe src="{{ $testimony->video }}" class="w-full h-full"></iframe>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div class="swiper-button-prev after:!hidden !absolute !right-auto !-left-14 hover:opacity-60 duration-300">
                            <img src="{{ asset('img/arrow_blue.png') }}" class="rotate-180 w-[40px] h-auto max-w-none"/>
                        </div>
                        <div class="swiper-button-next after:!hidden !absolute !left-auto !-right-14 hover:opacity-60 duration-300">
                            <img src="{{ asset('img/arrow_blue.png') }}" class="w-[40px] h-auto max-w-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endempty

    @empty($articles)
    @else
        <section id="last-articles">
            <div class="mx-auto flex flex-wrap max-w-7xl py-10">
                <hr class="w-[80px] h-[12px] mb-5 bg-secondary mx-auto rounded-sm"/>
                <h2 class="text-5xl text-secondary font-primary-black text-center w-full leading-none mb-5">{{ $noticiasTexto->title }}</h2>
                @foreach ($articles as $article)
                    @if ($loop->first)
                        <div class="w-full md:w-1/2">
                            <x-article-item size="big" :$article/>
                        </div>
                    @endif
                @endforeach
                <div class="w-full md:w-1/2 flex-wrap flex justify-center">
                    @foreach ($articles as $article)
                        @if (!$loop->first)
                            <x-article-item size="" :$article/>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    @endempty
@endsection
