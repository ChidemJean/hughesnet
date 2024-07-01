<?php

namespace App\View\Components;

use App\Models\GeralInf;
use Illuminate\View\Component;

class Footer extends Component
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
        $textoRodape = GeralInf::find(1)->footer_description ?? '';
        return view('site.components.footer', compact('textoRodape'));
    }
}
