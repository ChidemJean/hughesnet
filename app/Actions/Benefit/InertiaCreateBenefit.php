<?php

namespace App\Actions\Benefit;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaCreateBenefit
{
    use AsAction;

    public function asController(ActionRequest $request)
    {
        return Inertia::render('Benefits/Create');
    }
}
