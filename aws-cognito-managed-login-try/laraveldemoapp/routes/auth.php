<?php

use App\Http\Requests\CognitoAuthenticationRequest;
use App\Http\Requests\CognitoLoginRequest;
use App\Http\Requests\CognitoLogoutRequest;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::get('login', fn (CognitoLoginRequest $request) => $request->redirect())->name('login');

    Route::get('callback', fn (CognitoAuthenticationRequest $request) => tap(
        redirect()->intended(route('dashboard')),
        fn () => $request->authenticate(),
    ));
});

Route::post('logout', fn (CognitoLogoutRequest $request) => $request->logout())
    ->middleware(['auth'])->name('logout');
