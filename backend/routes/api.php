<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::post(
    '/login',
    [AuthController::class, 'login']
);

Route::post(
    '/forgot-password',
    [AuthController::class, 'forgotPassword']
);

Route::post(
    '/verify-reset-otp',
    [AuthController::class, 'verifyResetOtp']
);

Route::post(
    '/reset-password',
    [AuthController::class, 'resetPassword']
);

Route::get(
    '/projects',
    [ProjectController::class, 'index']
);

Route::get(
    '/projects/{project}',
    [ProjectController::class, 'show']
);

Route::middleware('auth:sanctum')->group(function () {

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );

    Route::post(
        '/change-password',
        [AuthController::class, 'changePassword']
    );

    Route::post(
        '/projects',
        [ProjectController::class, 'store']
    );

    Route::put(
        '/projects/{project}',
        [ProjectController::class, 'update']
    );

    Route::patch(
        '/projects/{project}',
        [ProjectController::class, 'update']
    );

    Route::delete(
        '/projects/{project}',
        [ProjectController::class, 'destroy']
    );
});