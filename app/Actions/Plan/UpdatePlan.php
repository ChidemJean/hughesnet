<?php

namespace App\Actions\Plan;

use App\Models\Plan;
use App\Models\PlanItem;
use App\Utils\FileUtils;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rule;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class UpdatePlan
{
    use AsAction;

    public function handle(int $id, array $attrs = [])
    {
        $plan = Plan::find($id);
        $plan->update($attrs);

        if (!empty($attrs['items'])) {
            $items = $plan->items()->get();

            $itemsState = array_map(function($item){
                return [
                    'id' => $item['id'] ?? null,
                    'title' => $item['title'], 
                    'text' => $item['text']
                ];
            }, $attrs['items']);

            foreach ($items as $k => $item) {
                $shouldDelete = true;
                foreach ($itemsState as $itemState) {
                    if ($itemState['id'] == $item->id) {
                        $shouldDelete = false;
                        break;
                    }
                }
                if ($shouldDelete) {
                    PlanItem::find($item->id)->delete();
                    unset($items[$k]);
                }
            }

            foreach ($itemsState as $order => $itemState) {
                if ($itemState['id'] == null) {
                    $plan->items()->save(new PlanItem($itemState));
                    continue;
                }
                foreach ($items as $k => $item) {
                    if ($itemState['id'] == $item->id) {
                        $item->update([
                            'title' => $itemState['title'],
                            'text' => $itemState['text'],
                        ]);
                        break;
                    }
                }
            }
        } else {
            $plan->items()->delete();
        }
    }

    public function rules(): array
    {
        return [
            'id' => "required|int",
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

        $path = null;

        unset($validatedData['id']);

        $this->handle($request['id'], $validatedData);

        return redirect(route('plans.index'));
    }
}
