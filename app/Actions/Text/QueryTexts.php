<?php

namespace App\Actions\Text;

use App\Models\Text;
use Illuminate\Database\Eloquent\Collection;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class QueryTexts
{
    use AsAction;

    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = 5;

    public function handle(string $search = '', int $offset = self::DEFAULT_OFFSET, int $limit = self::DEFAULT_LIMIT)
    {
        $count = Text::count();
        $query = Text::select()
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
            'model' => app(Text::class)->getTable()
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
