<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\BlockedUser;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function searchUsers(Request $request)
    {
        $userId = Auth::id();
        $user = User::withCount(['followers', 'followings'])->findOrFail($userId);
        $blockedUsers = $user->blockedUsers()->pluck('users.id')->toArray();

        $query = User::whereNotNull('email_verified_at')->whereNotIn('id', $blockedUsers)->withCount(['followers', 'followings']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            if (strlen($search) > 1) {
                $query = $query->where(function ($q) use ($search) {
                    $q->where('tagname', 'LIKE', '%' . $search . '%')
                        ->orWhere('fullname', 'LIKE', '%' . $search . '%');
                });
            }
        }

        return UserResource::collection(
            $query->orderBy('tagname', 'desc')->paginate(15)
        );
    }

    public function getUserProfile($id)
    {
        $user = User::withCount(['followers', 'followings'])
            ->with(['tweet' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->findOrFail($id);

        return new UserResource($user);
    }

    public function getBlockedUsers(Request $request)
    {
        $user = Auth::id();
        $blockedUsers = User::find($user)->blockedUsers()->paginate(15);

        return response()->json($blockedUsers);
    }

    public function getFollowingUsers(Request $request)
    {
        $user = Auth::id();
        $followingsUsers = User::find($user)->followings()->paginate(15);

        return response()->json($followingsUsers);
    }

    public function getFollowedUsers(Request $request)
    {
        $user = Auth::id();
        $followedUsers = User::find($user)->followers()->paginate(15);

        return response()->json($followedUsers);
    }


    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('users/image', 'public');

            $image->profilPicture = json_encode($image);
        }

        if(!$user->update($data)) {
            return response([
               "message" => "Failed to update datas"
            ], 422);
        }
        return new UserResource($user);
    }

    public function blockUser(Request $request)
    {
        $id_user = Auth::id();
        $id_user_blocked = $request->id_user_blocked;

        if ($id_user == $id_user_blocked) {
            return response()->json(['message' => 'You cannot block yourself'], 400);
        }

        $existingBlock = BlockedUser::where('id_user', $id_user)
            ->where('id_user_blocked', $id_user_blocked)
            ->first();

        if ($existingBlock) {
            $existingBlock->delete();

            return response()->json(['message' => 'Successfully unblocked the user'], 200);
        } else {
            $block = new BlockedUser();
            $block->id_user = $id_user;
            $block->id_user_blocked = $id_user_blocked;
            $block->save();

            return response()->json(['message' => 'Successfully blocked the user']);
        }
    }

    public function followUser(Request $request)
    {
        $follower_id = Auth::id();
        $followed_id = $request->followed_id;

        if ($follower_id == $followed_id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        $existingFollow = Follow::where('follower_id', $follower_id)
            ->where('followed_id', $followed_id)
            ->first();

        if (!$existingFollow) {
            $follow = new Follow();
            $follow->follower_id = $follower_id;
            $follow->followed_id = $followed_id;
            $follow->save();

            return response()->json(['message' => 'Successfully followed the user']);
        } else {
            $existingFollow->delete();

            return response()->json(['message' => 'Successfully unfollowed the user']);
        }
    }

    public function getUserCollection()
    {
        $user = Auth::user();

        $collection = $user->collections()->withCount(['likes', 'retweets', 'comment'])->paginate(20);

        return response()->json($collection);
    }
}
