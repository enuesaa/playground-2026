<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome')->name('home');

Route::view('dashboard', 'dashboard')->name('dashboard')->middleware('auth');

require __DIR__.'/auth.php';
