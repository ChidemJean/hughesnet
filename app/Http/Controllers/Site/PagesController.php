<?php

namespace App\Http\Controllers\Site;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Benefit;
use App\Models\Finality;
use App\Models\Financier;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Step;
use App\Utils\AntiSQL;
use App\Utils\VideoUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class PagesController extends Controller
{

    public function page(Request $request, string $slug = '')
    {
        $slug = AntiSQL::filter($slug);
        $page = Page::where('slug', '=', $slug)->firstOrFail();
        $pageItems = $page->items()->orderBy('order')->orderBy('id')->get();
        $video = null;
        if ($page->video) {
            $video = VideoUtils::getEmbedUrl($page->video);
        }

        return view('site.pages.page', compact('page', 'pageItems', 'video'));
    }

    public function links(Request $request, string $slug = '')
    {
        $slug = AntiSQL::filter($slug);
        $slug = str_replace('-',' ', $slug);
        $slug = str_replace('mais','+', $slug);
        $pages = Page::where('presentation_title', '=', $slug)->get();
        $page = null;
        foreach ($pages as $_page) {
            if ($_page->summary) {
                $page = $_page;
            }
        }

        return view('site.pages.links', compact('pages', 'page'));
    }

}
