<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('geral_infs', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('footer_description')->nullable();
            $table->text('phone')->nullable();
            $table->text('whatsapp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('geral_infs');
    }
};
