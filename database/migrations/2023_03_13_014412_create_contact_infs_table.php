<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\GeralInf;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contact_infs', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->nullable();
            $table->string('type')->nullable();
            $table->text('value')->nullable();
            $table->foreignIdFor(GeralInf::class)->nullable()->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_infs');
    }
};
