<?php

namespace App\Actions\Banner;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class QueryBanners
{
    use AsAction;

    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = 5;

    public function handle(string $search = '', int $offset = self::DEFAULT_OFFSET, int $limit = self::DEFAULT_LIMIT)
    {
        $count = Banner::count();
        $query = Banner::select()
                    ->orderBy('id')
                    ->when(!empty($search), fn ($query) => (
                        $query->where('title', 'like', '%'.$search.'%')
                    ))
                    ->skip($offset)
                    ->take($limit);
        $items = $query->get();

        return [
            'items' => $items,
            'count' => $count,
            'model' => app(Banner::class)->getTable()
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
