<?php

namespace App\Actions\Benefit;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class UpdateBenefit
{
    use AsAction;

    public function handle(int $id, array $attrs = [])
    {
        $text = Benefit::find($id);
        $text->update($attrs);
    }

    public function rules(): array
    {
        return [
            'id' => "required|int",
            'title' => "required|string",
            'text' => "nullable|string",
            'icon' => "nullable|mimes:png,jpg,jpeg",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();

        $hasFile = !empty($request->file('icon'));

        $path = null;
        if ($hasFile) {
            $text = Benefit::find($request['id']);
            if (!empty($text->icon)) {
                $file_path = public_path().DIRECTORY_SEPARATOR.$text->icon;
                if (!is_dir($file_path) && file_exists($file_path)) unlink($file_path);
            }
            $name = now()->timestamp.".{$request->file('icon')->getClientOriginalName()}";
            $request->file('icon')->move(public_path("benefits_files"), $name);
            $path = "benefits_files/".$name;
        }

        unset($validatedData['icon']);
        unset($validatedData['id']);

        if ($hasFile) {
            $validatedData['icon'] = $path;
        }

        $this->handle($request['id'], $validatedData);

        return redirect(route('benefits.index'));
    }
}
