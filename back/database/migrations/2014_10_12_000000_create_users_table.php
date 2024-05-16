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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('provider_id')->nullable();
            $table->string('provider')->nullable();
            $table->date('birthdate');
            $table->string('role')->nullable();
            $table->string('tagname')->nullable();
            $table->integer('age');
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('activated')->nullable();
            $table->rememberToken();
            $table->string('country')->nullable();
            $table->text('description')->nullable();
            $table->string('profilPicture')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
