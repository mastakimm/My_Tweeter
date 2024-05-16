<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTweetRequest extends FormRequest
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
            'text' => 'nullable|string|max:255|required_without_all:text,image_url,video_url,vocal_url,hashtags',
            'image_url' => 'nullable|url|max:255|required_without_all:text,image_url,video_url,vocal_url,hashtags',
            'video_url' => 'nullable|url|max:255|required_without_all:text,image_url,video_url,vocal_url,hashtags',
            'vocal_url' => 'nullable|url|max:255|required_without_all:text,image_url,video_url,hashtags',
            'hashtags' => 'nullable|array|required_without_all:text,image_url,video_url,vocal_url,hashtags',
        ];
    }
}
