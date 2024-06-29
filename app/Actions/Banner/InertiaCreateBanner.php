<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaCreateBanner
{
    use AsAction;

    public function asController(ActionRequest $request)
    {
        return Inertia::render('Banners/Create');
    }
}
