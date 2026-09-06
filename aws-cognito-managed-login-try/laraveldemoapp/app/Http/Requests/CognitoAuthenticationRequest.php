<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Services\Cognito;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CognitoAuthenticationRequest extends FormRequest
{
    /**
     * Exchange the authorization code for the Cognito user and log them in.
     */
    public function authenticate(): Authenticatable
    {
        abort_unless(
            hash_equals((string) $this->session()->pull('cognito_state'), (string) $this->query('state')),
            403,
        );

        $claims = Cognito::user($this->query('code'), $this->session()->pull('cognito_code_verifier'));

        dd($claims);

        $user = User::updateOrCreate(
            ['cognito_sub' => $claims['sub']],
            ['name' => $claims['name'] ?? $claims['email'], 'email' => $claims['email']],
        );

        Auth::login($user);

        $this->session()->regenerate();

        return $user;
    }
}
