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
        Schema::create('tweets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_retweet')->nullable();
            $table->unsignedBigInteger('id_tweet_parent')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->string('vocal_url')->nullable();
            $table->string('text', 255)->nullable();
            $table->timestamps();

            $table->foreign('id_retweet')->references('id')->on('tweets')->onDelete('cascade');
            $table->foreign('id_tweet_parent')->references('id')->on('tweets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tweets');
    }
};
