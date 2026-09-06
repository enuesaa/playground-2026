<?php

return [

    'cognito' => [
        'client_id' => env('COGNITO_CLIENT_ID'),
        'client_secret' => env('COGNITO_CLIENT_SECRET'),
        'domain' => env('COGNITO_DOMAIN'),
        'redirect_url' => env('COGNITO_REDIRECT_URL', env('APP_URL', 'http://localhost').'/callback'),
        'logout_redirect_url' => env('COGNITO_LOGOUT_REDIRECT_URL', env('APP_URL', 'http://localhost').'/'),
        'scopes' => env('COGNITO_SCOPES', 'openid email profile'),
    ],

];
