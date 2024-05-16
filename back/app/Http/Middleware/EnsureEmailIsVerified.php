<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;

class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() instanceof MustVerifyEmail &&
            !$request->user()->hasVerifiedEmail()) {
            return response()->json(['error' => 'Email not verified.'], 403);
        }

        return $next($request);
    }
}
