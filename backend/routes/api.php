<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Public Projects
|--------------------------------------------------------------------------
*/

Route::get(
    '/projects',
    [ProjectController::class, 'index']
);

Route::get(
    '/projects/{project}',
    [ProjectController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Public Certificates
|--------------------------------------------------------------------------
*/

Route::get(
    '/certificates',
    [CertificateController::class, 'index']
);

Route::get(
    '/certificates/{id}',
    [CertificateController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    | Authentication
    */

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );

    Route::post(
        '/change-password',
        [AuthController::class, 'changePassword']
    );

    /*
    | Project Management
    */

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

    /*
    | Certificate Management
    */

    Route::post(
        '/certificates',
        [CertificateController::class, 'store']
    );

    Route::put(
        '/certificates/{id}',
        [CertificateController::class, 'update']
    );

    Route::patch(
        '/certificates/{id}',
        [CertificateController::class, 'update']
    );

    Route::delete(
        '/certificates/{id}',
        [CertificateController::class, 'destroy']
    );
});