<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaEditText
{
    use AsAction;

    public function handle(string $slug)
    {
        return Text::firstWhere('slug', $slug);
    }

    public function asController(ActionRequest $request)
    {
        $text = $this->handle($request['id']);

        $text->img = null;

        return Inertia::render('Texts/Edit', compact('text'));
    }
}
