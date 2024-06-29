<?php

namespace App\Actions\Benefit;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaEditBenefit
{
    use AsAction;

    public function handle(int $id)
    {
        return Benefit::firstWhere('id', $id);
    }

    public function asController(ActionRequest $request)
    {
        $benefit = $this->handle($request['id']);

        $benefit->icon = null;

        return Inertia::render('Benefits/Edit', compact('benefit'));
    }
}
