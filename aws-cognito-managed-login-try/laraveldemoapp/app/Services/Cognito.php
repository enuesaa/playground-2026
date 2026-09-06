<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class Cognito
{
    /**
     * Build the Cognito Managed Login authorization URL.
     */
    public static function authorizationUrl(string $state, string $codeVerifier): string
    {
        return static::domain().'/oauth2/authorize?'.http_build_query([
            'client_id' => config('services.cognito.client_id'),
            'response_type' => 'code',
            'scope' => config('services.cognito.scopes'),
            'redirect_uri' => config('services.cognito.redirect_url'),
            'state' => $state,
            'code_challenge' => static::codeChallenge($codeVerifier),
            'code_challenge_method' => 'S256',
        ]);
    }

    /**
     * Build the Cognito Managed Login logout URL.
     */
    public static function logoutUrl(): string
    {
        return static::domain().'/logout?'.http_build_query([
            'client_id' => config('services.cognito.client_id'),
            'logout_uri' => config('services.cognito.logout_redirect_url'),
        ]);
    }

    /**
     * Exchange the authorization code for an access token, then fetch the user's claims.
     *
     * @return array<string, mixed>
     */
    public static function user(string $code, string $codeVerifier): array
    {
        $tokens = Http::asForm()->post(static::domain().'/oauth2/token', array_filter([
            'grant_type' => 'authorization_code',
            'client_id' => config('services.cognito.client_id'),
            'client_secret' => config('services.cognito.client_secret'),
            'code' => $code,
            'redirect_uri' => config('services.cognito.redirect_url'),
            'code_verifier' => $codeVerifier,
        ]))->throw()->json();

        return Http::withToken($tokens['access_token'])
            ->get(static::domain().'/oauth2/userInfo')
            ->throw()->json();
    }

    /**
     * Get the Cognito Managed Login domain, e.g. https://your-domain.auth.us-east-1.amazoncognito.com.
     */
    protected static function domain(): string
    {
        return rtrim(config('services.cognito.domain'), '/');
    }

    /**
     * Derive the PKCE code challenge from the given code verifier.
     */
    protected static function codeChallenge(string $codeVerifier): string
    {
        return rtrim(strtr(base64_encode(hash('sha256', $codeVerifier, true)), '+/', '-_'), '=');
    }
}
