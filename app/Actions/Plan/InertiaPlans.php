<?php

namespace App\Actions\Plan;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaPlans
{
    use AsAction;

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Plan>
     */
    public function handle()
    {
        return Plan::all();
    }

    public function rules()
    {
        return [
            'search' => 'optional|string'
        ];
    }

    public function asController(ActionRequest $request)
    {
        $plans = $this->handle();

        return Inertia::render('Plans/List', [
            'plans' => $plans,
            'search' => $request['search']
        ]);
    }
}
