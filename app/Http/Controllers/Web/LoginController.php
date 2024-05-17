<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }

        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }


    public function logout(Request $request)
    {


        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
