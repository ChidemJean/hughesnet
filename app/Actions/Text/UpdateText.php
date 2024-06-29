<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class UpdateText
{
    use AsAction;

    public function handle(int $id, array $attrs = [])
    {
        $text = Text::find($id);

        if ($text->is_internal == 0) {
            $attrs['slug'] = Text::makeSlug($attrs['title']);
        } else {
            unset($attrs['slug']);
        }

        $text->update($attrs);
    }

    public function rules(): array
    {
        return [
            'id' => "required|int",
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

        $hasFile = !empty($request->file('img'));

        $path = null;
        if ($hasFile) {
            $text = Text::find($request['id']);
            if (!empty($text->img)) {
                $file_path = public_path().DIRECTORY_SEPARATOR.$text->img;
                if (!is_dir($file_path) && file_exists($file_path)) unlink($file_path);
            }
            $name = now()->timestamp.".{$request->file('img')->getClientOriginalName()}";
            $request->file('img')->move(public_path("texts_files"), $name);
            $path = "texts_files/".$name;
        }

        unset($validatedData['img']);
        unset($validatedData['id']);

        if ($hasFile) {
            $validatedData['img'] = $path;
        }

        $this->handle($request['id'], $validatedData);

        return redirect(route('texts.index'));
    }
}
