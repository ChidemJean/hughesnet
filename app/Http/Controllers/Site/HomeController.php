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
use App\Models\Plan;
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
        $banners = Banner::inRandomOrder()->get();

        $idsTextosHome = [1, 2, 3];

        $textosHome = DB::table('texts')
                ->select('texts.*')
                ->whereRaw("find_in_set(texts.id, '".implode(',', $idsTextosHome)."')")
                ->get();

        $sobreHome = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 1;
        });

        $vantagensTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 2;
        });

        $planosTexto = Arr::first($textosHome, function ($value, int $key) {
            return $value->id == 3;
        });

        $benefits = Benefit::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        $plans = Plan::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->with('items')
            ->get();

        return view('site.pages.home', compact('banners', 'sobreHome', 'vantagensTexto', 'planosTexto', 'benefits', 'plans'));
    }

}
