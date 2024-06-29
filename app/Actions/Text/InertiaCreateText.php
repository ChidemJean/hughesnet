<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaCreateText
{
    use AsAction;

    public function asController(ActionRequest $request)
    {
        return Inertia::render('Texts/Create');
    }
}
