<?php

namespace App\Actions\Plan;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaEditPlan
{
    use AsAction;

    public function handle(string $slug)
    {
        return Plan::firstWhere('id', $slug);
    }

    public function asController(ActionRequest $request)
    {
        $plan = $this->handle($request['id']);
        $items = $plan->items()->get();

        return Inertia::render('Plans/Edit', compact('plan', 'items'));
    }
}
