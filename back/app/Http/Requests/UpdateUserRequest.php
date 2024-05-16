<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "fullname" => 'string|max:255',
            "email" => 'email|unique:users,email',
            'password' => [
                Password::min(8)
                    ->numbers()
                    ->symbols()
                    ->letters()
            ],
            "birthdate" => 'date',
            "tagname" => 'string|max:55',
            "zipcode" => 'int|max:5|min:5',
            "country" => 'string|max:55',
            "address" => 'string',
            "description" => 'string|max:255',
            "profilPicture" => 'file',
        ];
    }
}
