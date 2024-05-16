<?php

use App\Models\Tweet;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('tweets.{id}', function ($user, $tweetId) {
    \Illuminate\Support\Facades\Log::alert('kfqdklsdfnfkldsnfdklnd');

    $tweet = Tweet::findOrFail($tweetId);
    if ($tweet->user_id === $user->id) {
        return true;
    }

    $followingIds = $user->followings()->pluck('users.id')->toArray();

    if (in_array($user->id, $followingIds)) {
        return true;
    }

    return false;


});

