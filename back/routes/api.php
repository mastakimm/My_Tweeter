<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\TweetController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    Route::post('conversations/{id}/newParticipant', [ConversationController::class, 'addNewParticipant'])->name('conversations.newParticipant');
    Route::apiResource('conversations', ConversationController::class);

    Route::apiResource('messages', MessageController::class)->except(['index', 'show']);

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::prefix('users')->group( function () {
        Route::controller(UserController::class)->group(function () {
            Route::put('update', 'update')->name('update.user');
            Route::post('search', 'searchUsers')->name('search.users');
            Route::get('blocked', 'getBlockedUsers')->name('blocked.users');
            Route::get('followings', 'getFollowingUsers')->name('followings.users');
            Route::get('followed', 'getFollowedUsers')->name('followed.users');
        });
    });
    Route::prefix('tweets')->group(function () {
        Route::controller(TweetController::class)->group(function () {
            Route::get('trend', 'getTrend')->name('tweets.trend');
            Route::post('{id}/like','like')->name('tweets.like');
            Route::post('{id}/retweet', 'retweet')->name('tweets.retweet');
            Route::get('{id}/retweet', 'getRetweets')->name('tweets.getRetweet');
            Route::post('{id}/comment', 'comment')->name('tweets.comment');
            Route::get('{id}/comment', 'getComments')->name('tweets.getComment');
            Route::get('{hashtag}/hashtag', 'getTweetsByHashtag')->name('tweets.hashtag');
            Route::get('{id}/get', 'getUserTweet')->name('tweets.user');
            Route::post('{id}/collection', 'addTweetToCollection')->name('tweets.collection');
            Route::post('{id}/collection/delete', 'deleteTweetFromCollection')->name('tweets.collection.delete');
            Route::post('{id}/report', 'reportTweet')->name('tweets.report');
            Route::get('liked', 'getUserLikedTweets')->name('tweets.liked');
            Route::get('commented', 'getUserCommentedTweets')->name('tweets.commented');
        });
    });
    Route::apiResource('/tweets', TweetController::class);

    Route::prefix('user')->group(function () {
        Route::controller(UserController::class)->group(function () {
            Route::get('collection', 'getUserCollection')->name('user.collection');
            Route::post('follow', 'followUser')->name('user.follow');
            Route::post('block', 'blockUser')->name('user.block');
            Route::get('{id}', 'getUserProfile')->name('user.profile');
        });
    });

});

Route::controller(AuthController::class)->group(function () {
    Route::post('/signup', 'signup')->name('signup');
    Route::post('/login', 'login')->name('login');

    Route::get('email/verify/{id}/{hash}', 'verify')->name('verification.verify');
    Route::post('email/resend', 'resend')->name('verification.resend');

    Route::post('password/email','sendResetLinkEmail')->name('password.mail');
    Route::post('password/reset', 'reset')->name('password.reset');
    Route::get('password/reset/{token}', 'redirect')->name('password.reset');

    Route::post('/auth/google/callback', 'handleGoogleCallback')->name('tttt');
    /*
    Route::middleware('web')->get('auth/google', 'redirectToGoogle')->name('auth.google');
    Route::middleware('web')->get('auth/google/callback', 'handleGoogleCallback')->name('auth.google.callback');
    */
    Route::middleware('web')->get('auth/github', 'redirectToGithub')->name('auth.github');
    Route::middleware('web')->get('auth/github/callback','handleGithubCallback')->name('auth.github.callback');
});
