<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fullname' => $this->fullname,
            'email' => $this->email,
            'birthdate' => $this->birthdate,
            'activated' => $this->activated,
            'age' => $this->age,
            'tagname' => $this->tagname,
            'gender' => $this->gender,
            'zipcode' => $this->zipcode,
            'country' => $this->country,
            'address' => $this->address,
            'description' => $this->description,
            'profilPicture' => $this->profilPicture,
            'email_verified_at' => Carbon::parse($this->email_verified_at)->format('Y-m-d H:i:s'),
            'followers_count' => $this->followers_count ?? 0,
            'followings_count' => $this->followings_count ?? 0,
            'tweets' => $this->whenLoaded('tweets', function() {
                return $this->tweets->map(function ($tweet) {
                    return [
                        'id' => $tweet->id,
                        'text' => $tweet->text,
                        'created_at' => $tweet->created_at,
                        'updated_at' => $tweet->updated_at,
                    ];
                });
            }),
        ];
    }
}
