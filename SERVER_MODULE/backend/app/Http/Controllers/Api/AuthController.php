<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = [
            "email" => $request->email,
            "password" => $request->password,
        ];
        $validator = Validator::make( $request->all(), [
            'email' => 'required | email',
            'password' => 'required | min:5',
        ]);
        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('accessToken')->plainTextToken;
            $response = [
                "user" => [
                    "name" => $user->name,
                    "email" => $user->email,
                    "token" => $token,
                ]
            ];
            return new ApiResource(200, 'Login success', $response);
        } else if ($validator->fails()) {
            return new ApiResource(422, 'Invalid field', $validator->messages());
        } else {
            return new ApiResource(401, 'Email or password incorrect', null);
        }
    }

    public function logout() {
        if(auth()->user()->tokens()->delete()) {
            return new ApiResource(200, 'Logout Success', null);
        };
    }
}
