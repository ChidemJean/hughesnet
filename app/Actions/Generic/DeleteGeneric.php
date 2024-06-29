<?php

namespace App\Actions\Generic;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class DeleteGeneric
{
    use AsAction;

    public function handle(string $model, int $id)
    {
        $object = DB::table($model)->where("id", "=", $id);

        $data = $object->get()->toArray();
        foreach ($data as $field) {
            $values = (array) $field;
            foreach ($values as $col => $value) {
                if (!empty($value) && strpos($value, "_files/") !== false) {
                    $file_path = public_path().'/'.$value;
                    if (!is_dir($file_path) && file_exists($file_path)) {
                        unlink($file_path);
                    }
                }
            }
        }

        $object->delete();
    }

    public function rules()
    {
        return [
            'model' => 'required|string',
            'id' => 'required|integer'
        ];
    }

    public function asController(ActionRequest $request)
    {
        $request->validated();

        $this->handle($request->get('model'), $request->get('id'));

        return back();
    }
}
