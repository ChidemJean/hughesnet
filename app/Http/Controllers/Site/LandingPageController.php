<?php

namespace App\Http\Controllers\Site;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Benefit;
use App\Models\Finality;
use App\Models\Financier;
use App\Models\Partner;
use App\Models\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class LandingPageController extends Controller
{

    public function index(Request $request)
    {
        $banners = Banner::all();
        $benefits = Benefit::all();
        $partners = Partner::select("*")
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        $slugsTextosHome = ['parceiros-home', 'video-reduza', 'banner-reduza'];

        $textosHome = DB::table('texts')
                ->select('texts.*')
                ->whereRaw("find_in_set(texts.slug, '".implode(',', $slugsTextosHome)."')")
                ->get();

        $parceirosHome = Arr::first($textosHome, function ($value, int $key) {
            return $value->slug == "parceiros-home";
        });

        $videoReduza = Arr::first($textosHome, function ($value, int $key) {
            return $value->slug == "video-reduza";
        });

        $bannerReduza = Arr::first($textosHome, function ($value, int $key) {
            return $value->slug == "banner-reduza";
        });

        return view('site.landing-page.index', compact('banners', 'benefits', 'parceirosHome', 'partners', 'videoReduza', 'bannerReduza'));
    }

}
