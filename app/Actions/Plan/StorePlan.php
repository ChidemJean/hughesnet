<?php

namespace App\Actions\Plan;

use App\Models\PlanItem;
use App\Models\Plan;
use App\Utils\FileUtils;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class StorePlan
{
    use AsAction;

    public function handle(array $attrs = [])
    {
        $plan = Plan::create($attrs);
      
        if (!empty($attrs['items'])) {
            $plan->items()->saveMany([
                ...array_map(function($item){
                    return new PlanItem(['title' => $item['title'], 'text' => $item['text'] ]);
                }, $attrs['items'])
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'name' => "required|string",
            'price' => "required|numeric",
            'obs1' => "nullable|string",
            'obs2' => "nullable|string",
            'link' => "nullable|string",
            'items' => "nullable|array",
            'items.*.title' => "required|string",
            'items.*.text' => "required|string",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $validatedData = $request->validated();

        $this->handle($validatedData);

        return redirect(route("plans.index"));
    }
}
