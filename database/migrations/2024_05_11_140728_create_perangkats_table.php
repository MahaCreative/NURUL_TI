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
        Schema::create('perangkats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nama_perangkat');
            $table->string('kd_perangkat')->unique();
            $table->string('min_suhu')->default(0);
            $table->string('max_suhu')->default(0);
            $table->string('min_hum')->default(0);
            $table->string('max_hum')->default(0);
            $table->string('min_kt')->default(0);
            $table->string('max_kt')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perangkats');
    }
};
