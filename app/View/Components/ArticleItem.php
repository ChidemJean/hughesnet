<?php

namespace App\View\Components;

use App\Models\Article;
use App\Utils\DateUtils;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ArticleItem extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public string $size = "default",
        public $article
    ) {
    }

    public function getElapsedTime($datePublished): string
    {
        return DateUtils::getElapsedTime($datePublished);
    }

    public function getReadTime($content): string
    {
        return DateUtils::getReadTime($content);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('site.components.article-item');
    }
}
