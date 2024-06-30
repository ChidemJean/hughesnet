<?php

namespace App\Actions\GeralInf;

use App\Models\GeralInf;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class UpdateGeralInf
{
    use AsAction;

    public function handle(int $id, array $attrs = [])
    {
        $text = GeralInf::find($id);
        $text->update($attrs);
    }

    public function rules(): array
    {
        return [
            'id' => "required|int",
            'meta_description' => "nullable|string",
            'footer_description' => "nullable|string",
            'phone' => "nullable|string",
            'whatsapp' => "nullable|string"
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();
        
        unset($validatedData['id']);

        $this->handle($request['id'], $validatedData);

        return redirect(route('geral_inf.edit'));
    }
}
