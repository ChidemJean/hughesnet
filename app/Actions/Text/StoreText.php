<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class StoreText
{
    use AsAction;

    public function handle(array $attrs = [])
    {
        $attrs['slug'] = Text::makeSlug($attrs['title']);

        $article = Text::create($attrs);
    }

    public function rules(): array
    {
        return [
            'title' => "required|string",
            'subtitle' => "nullable|string",
            'content' => "nullable|string",
            'link' => "nullable|string",
            'img' => "nullable|mimes:png,jpg,jpeg",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();

        if (!empty($request->file('img'))) {
            $name = now()->timestamp.".{$request->file('img')->getClientOriginalName()}";
            $request->file('img')->move(public_path("texts_files"), $name);
            unset($validatedData['img']);
            $validatedData['img'] = "texts_files/".$name;
        }

        $this->handle($validatedData);

        return redirect(route("texts.index"));
    }
}
