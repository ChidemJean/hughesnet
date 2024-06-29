<?php

namespace App\Http\Controllers\Site;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Benefit;
use App\Models\Finality;
use App\Models\Financier;
use App\Models\Number;
use App\Models\Partner;
use App\Models\Person;
use App\Models\Step;
use App\Models\Testimony;
use App\Models\Video;
use App\Utils\VideoUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{

    public function index(Request $request)
    {
        $articles = Article::select()->where('highlight', '=', 1)->take(5)->get();
        $banners = Banner::inRandomOrder()->get();

        $idsTextosHome = [1, 2, 3, 5, 6];

        $textosHome = DB::table('texts')
                ->select('texts.*')
                ->whereRaw("find_in_set(texts.id, '".implode(',', $idsTextosHome)."')")
                ->get();

        $sobreHome = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 1;
        });

        $experienciasTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 2;
        });

        $conquistasTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 3;
        });

        $noticiasTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 6;
        });

        $depoimentosTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 5;
        });

        $numbers = Number::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->get()->toArray();

        $persons = Person::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        $testimonies = Testimony::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        if (!empty($testimonies)) {
            foreach ($testimonies as $key => $testimoy) {
                if (!empty($testimoy->video)) {
                    $testimoy->video = VideoUtils::getEmbedUrl($testimoy->video);
                }
            }
        }

        return view('site.pages.home', compact('articles', 'banners', 'sobreHome', 'experienciasTexto', 'conquistasTexto', 'noticiasTexto', 'depoimentosTexto', 'testimonies', 'numbers', 'persons'));
    }

}
