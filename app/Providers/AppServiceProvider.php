<?php

namespace App\Providers;

use App\Models\GeralInf;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('path.public', function () {
            return realpath(base_path() . '/public');
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        view()->composer(['site.layouts.app', 'site.components.footer'],
            function ($view) {
                $geralInf = GeralInf::find(1);
                $view->with('geral_inf', $geralInf);
            }
        );
    }
}
