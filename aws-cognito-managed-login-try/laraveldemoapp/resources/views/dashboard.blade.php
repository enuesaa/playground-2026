<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Dashboard - {{ config('app.name') }}</title>
</head>
<body>
    <p>Welcome, {{ auth()->user()->name }} ({{ auth()->user()->email }}).</p>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit">Log out</button>
    </form>
</body>
</html>
