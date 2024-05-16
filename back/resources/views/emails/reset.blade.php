@component('mail::message')
    # Hello!

    Please click on the button below to reset your password.

    @component('mail::button', ['url' => 'http://localhost:8000/api/password/reset?token=' . $token . '&email=' . $email])
        Reset Password
    @endcomponent

    Thanks,
    {{ config('app.name') }}
@endcomponent
