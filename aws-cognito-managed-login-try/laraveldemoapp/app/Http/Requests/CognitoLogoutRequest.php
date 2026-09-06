<?php

namespace App\Http\Requests;

use App\Services\Cognito;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CognitoLogoutRequest extends FormRequest
{
    /**
     * Log the user out locally and at Cognito Managed Login.
     */
    public function logout(): RedirectResponse
    {
        Auth::logout();

        $this->session()->invalidate();
        $this->session()->regenerateToken();

        return redirect(Cognito::logoutUrl());
    }
}
