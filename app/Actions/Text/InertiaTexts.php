<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaTexts
{
    use AsAction;

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Text>
     */
    public function handle()
    {
        return Text::all();
    }

    public function rules()
    {
        return [
            'search' => 'optional|string'
        ];
    }

    public function asController(ActionRequest $request)
    {
        $texts = $this->handle();

        return Inertia::render('Texts/List', [
            'texts' => $texts,
            'search' => $request['search']
        ]);
    }
}
