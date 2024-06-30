<?php

namespace App\Actions\Benefit;

use App\Models\Benefit;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class StoreBenefit
{
    use AsAction;

    public function handle(array $attrs = [])
    {
        $benefit = Benefit::create($attrs);
    }

    public function rules(): array
    {
        return [
            'title' => "required|string",
            'text' => "nullable|string",
            'icon' => "nullable|mimes:svg",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();

        if (!empty($request->file('icon'))) {
            $name = now()->timestamp.".{$request->file('icon')->getClientOriginalName()}";
            $request->file('icon')->move(public_path("benefits_files"), $name);
            unset($validatedData['icon']);
            $validatedData['icon'] = "benefits_files/".$name;
        }

        $this->handle($validatedData);

        return redirect(route("benefits.index"));
    }
}
