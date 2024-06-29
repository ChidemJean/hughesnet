<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class UpdateBanner
{
    use AsAction;

    public function handle(int $id, array $attrs = [])
    {
        $article = Banner::find($id)->update($attrs);
    }

    public function rules(): array
    {
        return [
            'id' => "required|int",
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

        $hasFile = !empty($request->file('background_img'));

        $path = null;
        if ($hasFile) {
            $article = Banner::find($request['id']);
            if (!empty($article->background_img)) {
                $file_path = public_path().DIRECTORY_SEPARATOR.$article->background_img;
                if (!is_dir($file_path) && file_exists($file_path)) unlink($file_path);
            }
            $name = now()->timestamp.".{$request->file('background_img')->getClientOriginalName()}";
            $request->file('background_img')->move(public_path("banners_files"), $name);
            $path = "banners_files/".$name;
        }

        $hasFileTablet = !empty($request->file('background_img_tablet'));
        $pathTablet = null;
        if ($hasFileTablet) {
            $article = Banner::find($request['id']);
            if (!empty($article->background_img_tablet)) {
                $file_path = public_path().DIRECTORY_SEPARATOR.$article->background_img_tablet;
                if (!is_dir($file_path) && file_exists($file_path)) unlink($file_path);
            }
            $name = now()->timestamp.".{$request->file('background_img_tablet')->getClientOriginalName()}";
            $request->file('background_img_tablet')->move(public_path("banners_tablet_files"), $name);
            $pathTablet = "banners_tablet_files/".$name;
        }

        $hasFileMobile = !empty($request->file('background_img_mobile'));
        $pathMobile = null;
        if ($hasFileMobile) {
            $article = Banner::find($request['id']);
            if (!empty($article->background_img_mobile)) {
                $file_path = public_path().DIRECTORY_SEPARATOR.$article->background_img_mobile;
                if (!is_dir($file_path) && file_exists($file_path)) unlink($file_path);
            }
            $name = now()->timestamp.".{$request->file('background_img_mobile')->getClientOriginalName()}";
            $request->file('background_img_mobile')->move(public_path("banners_mobile_files"), $name);
            $pathMobile = "banners_mobile_files/".$name;
        }

        unset($validatedData['background_img']);
        unset($validatedData['background_img_tablet']);
        unset($validatedData['background_img_mobile']);
        unset($validatedData['id']);

        if ($hasFile) {
            $validatedData['background_img'] = $path;
            $validatedData['background_img_tablet'] = $pathTablet;
            $validatedData['background_img_mobile'] = $pathMobile;
        }

        $this->handle($request['id'], $validatedData);

        return redirect(route('banners.index'));
    }
}
