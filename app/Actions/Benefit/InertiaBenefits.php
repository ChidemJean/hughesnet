<?php

namespace App\Actions\Benefit;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaBenefits
{
    use AsAction;

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Benefit>
     */
    public function handle()
    {
        return Benefit::all();
    }

    public function rules()
    {
        return [
            'search' => 'optional|string'
        ];
    }

    public function asController(ActionRequest $request)
    {
        $benefits = $this->handle();

        return Inertia::render('Benefits/List', [
            'benefits' => $benefits,
            'search' => $request['search']
        ]);
    }
}
