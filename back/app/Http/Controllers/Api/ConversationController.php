<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource. Get all the conversations for the logged user.
     */
    public function index()
    {
        $user = Auth::id();
        $conversations = User::find($user)->conversations()->paginate(15);

        return response()->json(['conversations' => $conversations]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'conversation_title' => 'required|string|max:255',
            'user_ids' => 'required|array',
        ]);

        $conversation = new Conversation;
        $conversation->conversation_title = $validatedData['conversation_title'];
        $conversation->save();

        $participants = [];

        $participant = new ConversationParticipant;
        $participant->conversation_id = $conversation->id;
        $participant->user_id = Auth::id();
        $participant->save();

        $participants[] = $participant;

        foreach ($validatedData['user_ids'] as $userId) {
            $participant = new ConversationParticipant;
            $participant->conversation_id = $conversation->id;
            $participant->user_id = $userId;
            $participant->save();

            $participants[] = $participant;
        }

        $participantIds = array_map(function($participant) {
            return $participant->id;
        }, $participants);

        return response()->json(['message' => 'Conversation created successfully', 'conversation' => $conversation, 'participants' => $participantIds]);
    }

    /**
     * Display the specified resource. Show the informations about a conversation.
     */
    public function show(string $id)
    {
        $conversation = Conversation::findOrFail($id);
        $conversationParticipants = $conversation->participants()->get();
        $conversationMessages = $conversation->messages()->paginate(15);

        return response()->json(['conversation' => $conversation, 'participants' => $conversationParticipants, 'messages' => $conversationMessages]);
    }

    /**
     * Update the specified resource in storage. Modify conversation Title
     */
    public function update(Request $request, string $conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);

        $validatedTitle = $request->validate([
            'conversation_title' => 'required|string|max:255'
        ]);

        $conversation->conversation_title = $validatedTitle['conversation_title'];
        $conversation->save();

        return response()->json(['message' => 'Successfully updated the conversation title', 'conversation' => $conversation]);
    }

    /**
     * Remove the specified resource from storage. L'utilisateur connecté quitte la conversation.
     */
    public function destroy(string $id)
    {
        $user = Auth::id();
        $conversation = Conversation::findOrFail($id);
        $participant = $conversation->participants()->where('user_id', $user)->first();

        if (!$participant) {
            return response()->json(['message' => 'Can\'t find the user in the conversation']);
        }

        $participant->delete();

        if ($conversation->participants()->count() == 0) {
            $conversation->messages()->delete();
            $conversation->delete();

            return response()->json(['message' => 'No more participant to this conversation. Conversation deleted']);
        }

        return response()->json(['message' => 'Successfully deleted from the conversation']);
    }

    public function addNewParticipant(Request $request, string $conversationId) {
        $newParticipantId = $request->validate([
            'user_id' => 'required|integer'
        ]);

        $existingParticipant = ConversationParticipant::where('conversation_id', $conversationId)
            ->where('user_id', $newParticipantId['user_id'])
            ->first();

        if ($existingParticipant) {
            return response()->json(['message' => 'User already joined the conversation'], 409);
        }

        $participant = new ConversationParticipant();
        $participant->conversation_id = $conversationId;
        $participant->user_id = $newParticipantId['user_id'];
        $participant->save();

        return response()->json(['message' => 'User joined the conversation successfully'], 200);
    }
}
