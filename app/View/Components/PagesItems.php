<?php

namespace App\View\Components;

use App\Models\Page;
use App\Models\Text;
use Illuminate\View\Component;

class PagesItems extends Component
{
     /**
     * Create a new component instance.
     */
    public function __construct(
        public $id = null,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $pages = !empty($this->id) ? Page::select()->where('id', '<>', $this->id)->get() : Page::all();
        $types = [];
        foreach ($pages as $page) {
            if (isset($types[$page->presentation_title])) {
                $types[$page->presentation_title] += 1;
            } else {
                $types[$page->presentation_title] = 1;
            }
        }
        return view('site.components.pages-items', compact('pages', 'types'));
    }
}
