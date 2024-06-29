<?php

namespace App\View\Components;

use App\Models\Text;
use Illuminate\View\Component;

class ContactForm extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $text = Text::find(4);
        return view('site.components.contact-form', compact('text'));
    }
}
