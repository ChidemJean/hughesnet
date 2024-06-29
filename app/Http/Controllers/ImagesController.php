<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{

    public function upload(Request $request)
    {
        $path = '';

        if (!empty($request->file('file'))) {
            $name = now()->timestamp.".{$request->file('file')->getClientOriginalName()}";
            $request->file('file')->move(public_path("editor_files"), $name);
        }

        $data = [
            'location' => asset('editor_files/'.$name)
        ];

        return response(json_encode($data), 200)->header('Content-Type', 'application/json');
    }

}
