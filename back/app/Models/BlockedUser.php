<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockedUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user', 'id_user_blocked'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function blockedUser()
    {
        return $this->belongsTo(User::class, 'id_user_blocked');
    }
}
