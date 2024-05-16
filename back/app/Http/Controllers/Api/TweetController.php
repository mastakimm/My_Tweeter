<?php

namespace App\Http\Controllers\Api;

use App\Events\Tweets\CommentTweet;
use App\Events\Tweets\LikeTweet;
use App\Events\Tweets\NewTweet;
use App\Events\Tweets\ReTweet;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTweetRequest;
use App\Models\Hashtag;
use App\Models\Like;
use App\Models\ReportedTweet;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TweetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $followingIds = $user->followings()->pluck('users.id')->toArray();

        $tweets = Tweet::whereIn('user_id', $followingIds)
            ->withCount(['likes', 'retweet', 'comment'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($tweets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'string|max:255',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif|max:4096',
            'video' => 'file|mimetypes:video/mp4,video/mpeg,video/quicktime|max:10240',
            'audio' => 'file|mimetypes:audio/mpeg,audio/mp3,audio/wav|max:4096',
        ]);

        $tweet = new Tweet($validated);
        $imageUrls = [];
        if ($request->hasFile('image')) {
            $images = $request->file('image');
            foreach ($images as $index => $image) {
                $imageUrls[] = $image->store('tweets/images', 'public');
            }
            $tweet->image_url = json_encode($imageUrls);
        }

        if ($request->hasFile('vocal')) {
            $vocal = $request->file('vocal');
            $vocal->store('tweets/vocal', 'public');

            $tweet->vocal_url = json_encode($vocal);
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $video->store('tweets/video', 'public');

            $tweet->video_url = json_encode($video);
        }

        $request->user()->tweet()->save($tweet);

        if ($request->filled('hashtags')) {
            $hashtagsInput = $request->hashtags;
            $hashtags = [];

            foreach ($hashtagsInput as $hashtagName) {
                $hashtag = Hashtag::firstOrCreate(['hashtag_name' => strtolower($hashtagName)]);
                $hashtags[] = $hashtag->id;
            }

            $tweet->hashtags()->sync($hashtags);
        }

        $currentUserId = Auth::id();
        $followingIds = $request->user()->followings()->pluck('users.id')->toArray();
        array_push($followingIds, $currentUserId);

        foreach($followingIds as $following) {
            event(new NewTweet(trim($following), $tweet));
        }

        return response()->json(['message' => 'Tweet envoyé avec succès'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tweet = Tweet::where('id', $id)
            ->withCount(['likes', 'retweet', 'comment'])
            ->first();
        return response()->json($tweet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tweet = Tweet::findOrFail($id)->withCount(['likes', 'retweet', 'comment']);
        $validated = $request->validate([
            'text' => 'string|max:255',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif|max:4096',
            'video' => 'file|mimetypes:video/mp4,video/mpeg,video/quicktime|max:10240',
            'audio' => 'file|mimetypes:audio/mpeg,audio/mp3,audio/wav|max:4096',
        ]);

        $imageUrls = [];
        if ($request->hasFile('image')) {
            $images = $request->file('image');
            foreach ($images as $index => $image) {
                $imageUrls[] = $image->store('tweets/images', 'public');
            }
            $tweet->image_url = json_encode($imageUrls);
        }

        if ($request->hasFile('vocal')) {
            $vocal = $request->file('vocal');
            $vocal->store('tweets/vocal', 'public');

            $tweet->vocal_url = json_encode($vocal);
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $video->store('tweets/video', 'public');

            $tweet->video_url = json_encode($video);
        }

        $tweet->update($validated);

        broadcast(new NewTweet($tweet))->toOthers();

        return response()->json($tweet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // I'm not using FindOrFail, so I can return a custom message if the tweet doesn't exist
        if (!$tweet = Tweet::find($id)) {
            return response()->json(['message' => 'This tweet doesn\'t exists'], 202);
        };
        $tweet->delete();
        return response()->json(['message' => 'Tweet successfully deleted'], 204);
    }

    public function like(string $id)
    {
        $tweet = Tweet::findOrFail($id);
        $user = auth()->user();

        if ($user->likes()->where('tweets.id', $id)->exists()) {
            $user->likes()->detach($tweet);

            $responseMessage = 'Tweet successfully unliked';
        } else {
            $user->likes()->attach($tweet);

            $responseMessage = 'Tweet successfully liked';
        }

        event(new LikeTweet($tweet));

        return response()->json(['message' => $responseMessage]);
    }

    public function retweet(StoreTweetRequest $request, string $tweetId)
    {
        $user = Auth::user();
        $originalTweet = Tweet::findOrFail($tweetId);

        $existingRetweet = Tweet::where('user_id', $user->id)
            ->where('id_retweet', $originalTweet->id)
            ->first();

        if ($existingRetweet) {
            return response()->json(['message' => 'You have already retweeted this tweet.'], 400);
        }

        $retweet = new Tweet([
            'user_id' => $user->id = auth()->id(),
            'id_retweet' => $tweetId,
            'text' => $request->text,
            'image_url' => $request->image_url,
            'video_url' => $request->video_url,
            'vocal_url' => $request->vocal_url,
        ]);

        $retweet->retweets()->associate($originalTweet);
        $retweet->save();

        event(new ReTweet($retweet));

        return response()->json(['message' => 'Retweeted successfully'], 201);
    }

    public function getRetweets(string $id)
    {
        $originalTweet = Tweet::findOrFail($id);
        $retweets = $originalTweet->retweet()->withCount(['likes', 'retweet', 'comment'])->get();

        return response()->json($retweets);
    }

    public function getComments($tweetId)
    {
        $userId = Auth::id();
        $tweet = Tweet::findOrFail($tweetId);

        $tweet->comment()->paginate(10);

        return response()->json(['tweet' => $tweet]);
    }

    public function comment(StoreTweetRequest $request, string $tweetId)
    {
        $user = Auth::user();
        $originalTweet = Tweet::findOrFail($tweetId);

        $comment = new Tweet([
            'user_id' => $user->id,
            'id_tweet_parent' => $tweetId,
            'text' => $request->text,
            'image_url' => $request->image_url,
            'video_url' => $request->video_url,
            'vocal_url' => $request->vocal_url,
        ]);

        $comment->parentTweet()->associate($originalTweet);
        $comment->save();

        event(new CommentTweet($comment));

        return response()->json(['message' => 'Commented successfully'], 201);
    }

    public function getTweetsByHashtag($hashtag)
    {
        $hashtag = Hashtag::where('hashtag_name', strtolower($hashtag))->first();

        if ($hashtag) {
            $tweets = $hashtag->tweet()->withCount(['likes', 'retweet', 'comment'])->get();
            return response()->json($tweets);
        } else {
            return response()->json(['message' => 'No tweet founded'], 404);
        }
    }

    public function getUserTweet(string $id)
    {
        $user = User::findOrFail($id);
        $tweets = $user->tweet()->withCount(['likes', 'retweet', 'comment'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($tweets);
    }

    public function addTweetToCollection(String $id)
    {
        $user = Auth::user();
        $tweet = Tweet::findOrFail($id);

        $existingTweet = $user->collections()->where('tweet_id', $id)->first();

        if ($existingTweet) {
            return response()->json(['message' => 'Tweet already in your collection'], 202);
        }


        if (!$user->collections()->syncWithoutDetaching([$tweet->id])) {
            return response()->json(['message' => 'Failed to add to your collection'], 202);
        }

        return response()->json(['message' => 'Tweet added to collection successfully']);
    }

    public function deleteTweetFromCollection(string $id)
    {
        $user = Auth::user();
        $tweet = $user->collections()
            ->where('tweet_id', $id)
            ->delete();

        return response()->json(['message' => 'Successfully deleted from collection']);
    }

    public function reportTweet(string $id, Request $request)
    {
        $message = $request->validate([
            'message' => 'string|max:255'
        ]);

        $user = Auth::user();
        $tweet = Tweet::findOrFail($id);

        $reportedTweet = new ReportedTweet([
            'id_user' => $user->id,
            'id_tweet' => $tweet->id,
            'message' => $message['message']
        ]);

        $reportedTweet->save();

        return response()->json(['message' => 'Tweet successfully reported']);
    }

    public function getTrend()
    {
        $trends = Hashtag::withCount(['tweet'])
            ->orderBy('tweet_count', 'desc')
            ->get();

        return response()->json($trends);
    }

    public function getUserLikedTweets()
    {
        $authUserId = Auth::id();

        $likedTweets = Like::where('user_id', $authUserId)
            ->with('tweet')
            ->paginate(15);

        return response()->json(['likedTweets' => $likedTweets]);
    }

    public function getUserCommentedTweets()
    {
        $authUserId = Auth::id();

        $commentedTweets = Tweet::where('user_id', $authUserId)
            ->whereNotNull('id_tweet_parent')
            ->paginate(15);

        return response()->json(['commentedTweets' => $commentedTweets]);
    }
}
