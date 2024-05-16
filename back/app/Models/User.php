<?php

namespace App\Models;

use Carbon\Carbon;
use http\Message;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Passport\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'id',
        'fullname',
        'pseudo',
        'email',
        'password',
        'provider_id',
        'provider',
        'birthdate',
        'tagname',
        'role',
        'age',
        'country',
        'description',
        'profilPicture',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /*          *Tweets          */

    public function reportTweet()
    {
        return $this->belongsToMany(ReportedTweet::class, 'reported_tweets', 'id_user', 'id_tweet');
    }

    public function tweet()
    {
        return $this->hasMany(Tweet::class);
    }

    public function collections()
    {
        return $this->belongsToMany(Tweet::class, 'users_collections');
    }
    public function retweets()
    {
        return $this->hasMany(Tweet::class, 'id_retweet', 'id');
    }
    public function hasRetweeted(Tweet $tweet)
    {
        return $this->retweets()->where('id_retweet', $tweet->id)->exists();
    }

    public function follows()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_id', 'follower_id');
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_id');
    }

    public function commentedTweets()
    {
        return $this->hasMany(Tweet::class, 'user_id')
            ->whereNotNull('id_tweet_parent');
    }

    public function likes()
    {
        return $this->belongsToMany(Tweet::class, 'likes', 'user_id', 'tweet_id');
    }

    public function messages()
    {
        return $this->hasMany(\App\Models\Message::class, 'user_id');
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversations_participants');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'notifiable_id');
    }

    public function blockedUsers()
    {
        return $this->belongsToMany(User::class, 'blocked_users', 'id_user', 'id_user_blocked');
    }

    public function reportedTweets()
    {
        return $this->hasMany(ReportedTweet::class);
    }

    public function personalAccessTokens()
    {
        return $this->belongsTo(OauthAccessToken::class, 'id', 'user_id');
    }

    /*          userAge from userBirthdate          */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($user) {
            if ($user->birthdate) {
                $user->age = Carbon::parse($user->birthdate)->age;
            }
        });
    }
}
