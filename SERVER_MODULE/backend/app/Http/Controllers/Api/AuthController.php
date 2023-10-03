<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        $validator = Validator::make( $request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required', 'min:5'],
        ]);

        if (auth()->attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('accessToken')->plainTextToken;
            $response = [
                'user' => [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'accessToken' => $token,
                ]
            ];
            // header('Response status: 200');
            return new AuthResource(200, 'Login success', $response);
        } else if ($validator->fails()) {
            $response = [
                "errors" => $validator->messages()
            ];
            // header('Response status: 402');
            return new AuthResource(402, 'Invalid field', $response);
        } else {
            $response = [
                "errors" => "Email or password incorrect"
            ];
            // header('Response status: 401');
            return new AuthResource(402, 'Login Failed', $response);
        }
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        // header('Response status: 200');
        return new AuthResource(200, 'Logout success', null);
    }
}
