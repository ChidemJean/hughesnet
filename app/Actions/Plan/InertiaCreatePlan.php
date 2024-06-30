<?php

namespace App\Actions\Plan;

use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaCreatePlan
{
    use AsAction;

    public function asController(ActionRequest $request)
    {
        return Inertia::render('Plans/Create');
    }
}
