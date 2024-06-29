<?php

namespace App\Actions\Generic;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class SaveOrder
{
    use AsAction;

    public function handle(string $model, array $ids)
    {
        $idsStr = implode(', ', $ids);
        $whens = "";

        foreach ($ids as $order => $id) {
            $whens .= "\n WHEN id = $id THEN $order";
        }

        $statement = "UPDATE `$model`
            SET `order` = CASE
                $whens
            ELSE `order`
            END
            WHERE id IN ($idsStr)
        ";

        DB::statement($statement);
    }

    public function rules()
    {
        return [
            'model' => 'required|string',
            'ids'   => 'required|array|min:1',
            'ids.*' => 'integer',
        ];
    }

    public function asController(ActionRequest $request)
    {
        $request->validated();

        $this->handle($request->get('model'), $request->get('ids'));

        return back();
    }
}
