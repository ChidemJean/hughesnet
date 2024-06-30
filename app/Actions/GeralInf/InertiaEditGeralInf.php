<?php

namespace App\Actions\GeralInf;

use App\Models\GeralInf;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaEditGeralInf
{
    use AsAction;

    public function handle()
    {
        return GeralInf::find(1);
    }

    public function asController(ActionRequest $request)
    {
        $geral_inf = $this->handle();

        return Inertia::render('GeralInf/Edit', compact('geral_inf'));
    }
}
