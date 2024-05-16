<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'string|max:255',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif|max:4096',
            'video' => 'file|mimetypes:video/mp4,video/mpeg,video/quicktime|max:10240',
            'audio' => 'file|mimetypes:audio/mpeg,audio/mp3,audio/wav|max:4096',
        ]);

        $message = new Message($validated);

        $userId = Auth::id();
        $conversation = Conversation::findOrFail($request->conversation_id);
        $participant = ConversationParticipant::firstOrCreate([
            'conversation_id' => $conversation->id,
            'user_id' => $userId,
        ]);

        if ($request->hasFile('image')) {
            $imageUrls = [];
            foreach ($request->file('image') as $image) {
                $imageUrls[] = $image->store('messages/images', 'public');
            }
            $message->image_url = json_encode($imageUrls);
        }

        if ($request->hasFile('audio')) {
            $audio = $request->file('audio');
            $audioUrl = $audio->store('messages/audio', 'public');
            $message->audio_url = $audioUrl;
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoUrl = $video->store('messages/video', 'public');
            $message->video_url = $videoUrl;
        }

        $message->conversation_id = $conversation->id;
        $message->user_id = $userId;
        $message->save();

        return response()->json(['message' => 'Message sent successfully'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $message = Message::findOrFail($id);

        $validated = $request->validate([
            'message' => 'string|max:255',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif|max:4096',
            'video' => 'file|mimetypes:video/mp4,video/mpeg,video/quicktime|max:10240',
            'audio' => 'file|mimetypes:audio/mpeg,audio/mp3,audio/wav|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $imageUrls = [];
            foreach ($request->file('image') as $image) {
                $imageUrls[] = $image->store('messages/images', 'public');
            }
            $message->image_url = json_encode($imageUrls);
        }

        if ($request->hasFile('audio')) {
            $audio = $request->file('audio');
            $audioUrl = $audio->store('messages/audio', 'public');
            $message->audio_url = $audioUrl;
        }

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoUrl = $video->store('messages/video', 'public');
            $message->video_url = $videoUrl;
        }

        $message->update($validated);

        return response()->json(['message' => 'Message updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $messageToDelete = Message::findOrFail($id);
        $messageToDelete->delete();

        return response()->json(['message' => 'Message deleted successfully'], 204);
    }
}
