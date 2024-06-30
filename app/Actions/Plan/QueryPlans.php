<?php

namespace App\Actions\Plan;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class QueryPlans
{
    use AsAction;

    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = null;

    public function handle(string $search = '', int $offset = self::DEFAULT_OFFSET, ?int $limit = self::DEFAULT_LIMIT)
    {
        $count = Plan::count();
        $query = Plan::select("*")
                    ->orderBy('order')
                    ->orderBy('id')
                    ->when(!empty($search), fn ($query) => (
                        $query->where('name', 'like', '%'.$search.'%')
                    ));
        if ($limit != null) {
            $query->skip($offset);
            $query->take($limit);
        }

        return [
            'items' => $query->get(),
            'count' => $count,
            'model' => app(Plan::class)->getTable()
        ];
    }

    public function rules(): array
    {
        return [
            'search' => "nullable|string",
            'offset' => "nullable|int",
            'limit' => "nullable|int",
        ];
    }

    public function asController(ActionRequest $request)
    {
        $dataRequest = $request->only('search', 'offset', 'limit');

        $data = $this->handle($dataRequest['search'] ?? '', $dataRequest['offset'] ?? self::DEFAULT_OFFSET, $dataRequest['limit'] ?? self::DEFAULT_LIMIT);

        return response(json_encode($data), 200)->header('Content-Type', 'application/json');
    }
}
