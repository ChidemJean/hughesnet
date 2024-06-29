<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class StoreBanner
{
    use AsAction;

    public function handle(array $attrs = [])
    {
        $banner = Banner::create($attrs);
    }

    public function rules(): array
    {
        return [
            'title' => "required|string",
            'text' => "nullable|string",
            'link' => "nullable|string",
            'background_img' => "nullable|mimes:png,jpg,jpeg",
            'background_img_tablet' => "nullable|mimes:png,jpg,jpeg",
            'background_img_mobile' => "nullable|mimes:png,jpg,jpeg",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();

        if (!empty($request->file('background_img'))) {
            $name = now()->timestamp.".{$request->file('background_img')->getClientOriginalName()}";
            $request->file('background_img')->move(public_path("banners_files"), $name);
            unset($validatedData['background_img']);
            $validatedData['background_img'] = "banners_files/".$name;
        }

        if (!empty($request->file('background_img_tablet'))) {
            $name = now()->timestamp.".{$request->file('background_img_tablet')->getClientOriginalName()}";
            $request->file('background_img_tablet')->move(public_path("banners_tablet_files"), $name);
            unset($validatedData['background_img_tablet']);
            $validatedData['background_img_tablet'] = "banners_tablet_files/".$name;
        }

        if (!empty($request->file('background_img_mobile'))) {
            $name = now()->timestamp.".{$request->file('background_img_mobile')->getClientOriginalName()}";
            $request->file('background_img_mobile')->move(public_path("banners_mobile_files"), $name);
            unset($validatedData['background_img_mobile']);
            $validatedData['background_img_mobile'] = "banners_mobile_files/".$name;
        }

        $this->handle($validatedData);

        return redirect(route("banners.index"));
    }
}
