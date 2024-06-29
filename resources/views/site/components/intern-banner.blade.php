<div class="h-[280px] md:h-[500px]" >
    <div class="relative flex h-full w-full">
        <img src="{{ asset($image) }}" class="{{ $imageMobile ? 'hidden md:block' : 'block' }} w-full h-full absolute z-0 object-cover object-center"/>
        @if ($imageMobile)
            <img src="{{ asset($imageMobile) }}" class="block md:hidden w-full h-full absolute z-0 object-cover object-center"/>
        @endif
    </div>
</div>
