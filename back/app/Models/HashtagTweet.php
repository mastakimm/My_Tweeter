<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HashtagTweet extends Model
{
    use HasFactory;

    protected $table = 'hashtags_tweets';

    protected $fillable = [
        'hashtag_id', 'tweet_id'
    ];

    public function hashtag()
    {
        return $this->belongsTo(Hashtag::class);
    }

    public function tweet()
    {
        return $this->belongsTo(Tweet::class);
    }
}
