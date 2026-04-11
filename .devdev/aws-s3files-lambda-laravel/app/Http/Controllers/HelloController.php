<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloController extends Controller
{
    public function get()
    {
        return response()->json([
            'message' => 'hello'
        ]);
    }
}
