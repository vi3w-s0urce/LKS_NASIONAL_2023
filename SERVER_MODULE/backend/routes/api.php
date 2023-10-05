<?php

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FormController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ResponseController;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function() {
    Route::post('v1/auth/login', 'login');
    Route::post('v1/auth/logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function (){
    Route::controller(FormController::class)->group(function () {
        Route::post('v1/forms', 'create');
        Route::get('v1/forms', 'index');
        Route::get('v1/forms/{slug}', 'detail');
    });

    Route::controller(QuestionController::class)->group(function () {
        Route::post('v1/forms/{slug}/questions', 'add');
        Route::delete('v1/forms/{slug}/questions/{question_id}', 'remove');
    });

    Route::controller(ResponseController::class)->group(function () {
        Route::post('v1/forms/{slug}/responses', 'submit');
        Route::get('v1/forms/{slug}/responses', 'index');
    });
});

