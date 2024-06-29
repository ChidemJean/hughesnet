<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaEditBanner
{
    use AsAction;

    public function handle(string $id)
    {
        return Banner::firstWhere('id', $id);
    }

    public function asController(ActionRequest $request)
    {
        $banner = $this->handle($request['id']);

        $banner->background_img = null;
        $banner->background_img_tablet = null;
        $banner->background_img_mobile = null;

        return Inertia::render('Banners/Edit', compact('banner'));
    }
}
