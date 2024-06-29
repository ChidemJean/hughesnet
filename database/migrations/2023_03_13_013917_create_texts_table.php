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
        Schema::create('texts', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->text('subtitle')->nullable();
            $table->text('slug')->nullable();
            $table->text('content')->nullable();
            $table->text('img')->nullable();
            $table->text('link')->nullable();
            $table->boolean('is_internal')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('texts');
    }
};
