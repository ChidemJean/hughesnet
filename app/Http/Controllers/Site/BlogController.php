<?php

namespace App\Http\Controllers\Site;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Utils\AntiSQL;
use Illuminate\Http\Request;

class BlogController extends Controller
{

    public function index(Request $request, string $category = null)
    {
        $query = Article::select()->orderByDesc('published_at');

        if (!empty($category)) {
            $categoryObj = BlogCategory::firstWhere('slug', $category);
            $query->where("blog_category_id", "=", $categoryObj->id);
        }

        $articles = $query->get();
        $categories = BlogCategory::all();

        return view('site.pages.blog', compact('articles', 'categories', 'category'));
    }

    public function article(Request $request, string $slug = '')
    {
        $slug = AntiSQL::filter($slug);
        $article = Article::select()
            ->where('slug', '=', $slug)
            ->with('category')
            ->with('author')
            ->first();

        return view('site.pages.article', compact('article'));
    }

}
