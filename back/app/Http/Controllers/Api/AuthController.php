<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Pusher\Pusher;

class AuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }


    private function verifyGoogleToken($idToken)
    {
        $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . $idToken;
        $response = file_get_contents($url);
        $tokenInfo = json_decode($response, true);

        if ($tokenInfo && isset($tokenInfo['aud']) && $tokenInfo['aud'] == '393677604939-k10j1a453litv9p201kuq9lc9iqnch5m.apps.googleusercontent.com') {
            return $tokenInfo;
        } else {
            return null;
        }
    }

    public function handleGoogleCallback(Request $request)
    {
        $tokenId = $request->input('tokenId');
        $user = $this->verifyGoogleToken($tokenId);

        try {
            $existingUser = User::where('email', $user['email'])->first();

            if ($existingUser) {
                Auth::login($existingUser);
                $token = $existingUser->createToken('main')->accessToken;

                return response()->json([
                    "user" => new UserResource($existingUser),
                    "token" => $token
                ]);
            } else {
                $nameSplited = explode(' ', $user['name']);
                $firstname = $nameSplited[0];

                $newUser = User::create([
                    'fullname' => $user['name'],
                    'email' => $user['email'],
                    'tagname' => $firstname . Str::random(8),
                    'password' => bcrypt('Password9.'),
                    'provider' => 'google',
                    'provider_id' => intval($user['sub']),
                    'email_verified_at' => Carbon::now()
                ]);
                $token = $newUser->createToken('main')->accessToken;

                return response()->json([
                    "user" => new UserResource($newUser),
                    "token" => $token
                ]);
            }

        } catch (Exception $e) {
            Log::error($e);
            return response()->json(['error' => 'Unable to login using Google. Please try again.']);
        }
    }

    public function redirectToGithub()
    {
        return Socialite::driver('github')
            ->redirect();
    }

    public function handleGithubCallback()
    {
        try {
            $user = Socialite::driver('github')->user();

            $existingUser = User::where('email', $user->email)->first();


            if ($existingUser) {
                Auth::login($existingUser);
                $token = $existingUser->createToken('main')->accessToken;

                return redirect('http://localhost:5173/home')
                    ->withCookie(cookie('acces_token', $token, 0, null, null, false, false));
            } else {
                $nameSplit = explode(' ', $user->name);
                $firstname = $nameSplit[0];

                $newUser = User::create([
                    'fullname' => $user->name,
                    'email' => $user->email,
                    'tagname' => '@' . $firstname . Str::random(8),
                    'password' => bcrypt(Str::random(24) . '3.'),
                    'provider' => 'github',
                    'provider_id' => $user->id,
                    'email_verified_at' => now(),
                ]);
                $token = $newUser->createToken('main')->accessToken;

                Auth::login($existingUser);

                return redirect('http://localhost:5173/home')
                    ->withCookie(cookie('acces_token', $token, 0, null, null, false, false));
            }

        } catch (Exception $e) {
            return response()->json(['error' => 'Unable to login using Google. Please try again.']);
        }
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */

        $user = User::create([
            'fullname' => $data['fullname'],
            'birthdate' => $data['birthdate'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'tagname' => $data['tagname'],
        ]);

        $token = $user->createToken('main')->accessToken;

        $user->sendEmailVerificationNotification();

        return response()->json([
            "user" => new UserResource($user),
            "token" => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        if (!$request->user() || !$request->user()->hasVerifiedEmail()) {
            return response(['message' => 'Your email address is not verified.'], 403);
        }

        $token = $user->createToken('main')->accessToken;
        return response()->json([
            "user" => new UserResource($user),
            "token" => $token
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        /** @var User $user */
        $user->personalAccessTokens()->delete();
        return response()->json('', 204);
    }

    public function verify(Request $request) {
        $user = User::find($request->route('id'));

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link'], 400);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect('http://localhost:5173/home');

    }

    public function resend(Request $request) {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->firstOrFail();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified']);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent']);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email.'])
            : response()->json(['message' => 'Unable to send reset link'], 500);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successfully.'], 200)
            : response()->json(['message' => 'Failed to reset password.'], 500);
    }

    public function redirect($token, Request $request)
    {
        $reactAppUrl = 'http://localhost:3000/password/reset?token=' . $token . '&email=' . $request->email;
        return redirect($reactAppUrl);
    }
}
