<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
</head>
<body>
    @auth
        <p><a href="{{ route('dashboard') }}">Dashboard</a></p>
    @else
        <p><a href="{{ route('login') }}">Log in with Cognito</a></p>
    @endauth
</body>
</html>
