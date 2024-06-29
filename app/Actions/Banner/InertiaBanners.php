<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class InertiaBanners
{
    use AsAction;

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Banner>
     */
    public function handle()
    {
        return Banner::all();
    }

    public function rules()
    {
        return [
            'search' => 'optional|string'
        ];
    }

    public function asController(ActionRequest $request)
    {
        $banners = $this->handle();

        return Inertia::render('Banners/List', [
            'banners' => $banners,
            'search' => $request['search']
        ]);
    }
}
