<?php

namespace App\Http\Requests;

use App\Services\Cognito;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class CognitoLoginRequest extends FormRequest
{
    /**
     * Redirect the user to Cognito Managed Login for authentication.
     */
    public function redirect(): RedirectResponse
    {
        $state = Str::random(20);
        $codeVerifier = Str::random(64);

        $this->session()->put('cognito_state', $state);
        $this->session()->put('cognito_code_verifier', $codeVerifier);

        return redirect(Cognito::authorizationUrl($state, $codeVerifier));
    }
}
