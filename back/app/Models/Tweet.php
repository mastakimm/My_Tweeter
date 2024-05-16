<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'text',
        'image_url',
        'video_url',
        'vocal_url',
    ];

    /*          User           */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes', 'tweet_id', 'user_id');
    }

    public function collection()
    {
        return $this->belongsToMany(Tweet::class, 'users_collections');
    }

    public function retweets()
    {
        return $this->belongsTo(Tweet::class, 'id_retweet');
    }

    public function retweet()
    {
        return $this->hasMany(Tweet::class, 'id_retweet');
    }

    public function comment()
    {
        return $this->hasMany(Tweet::class, 'id_tweet_parent');
    }

    public function parentTweet()
    {
        return $this->belongsTo(Tweet::class, 'id_tweet_parent');
    }

    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class, 'hashtags_tweets');
    }

    public function reportTweet()
    {
        return $this->belongsToMany(ReportedTweet::class, 'reported_tweets', 'id', 'id_tweet');
    }

    public function reportedTweets()
    {
        return $this->hasMany(ReportedTweet::class);
    }

    public function isRetweet()
    {
        return !is_null($this->id_retweet);
    }

    public function isReply()
    {
        return !is_null($this->id_tweet_parent);
    }

}
