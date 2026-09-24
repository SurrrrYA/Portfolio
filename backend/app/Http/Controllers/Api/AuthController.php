<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetOtp;
use App\Models\User;
use App\Services\PhpMailerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where(
            'email',
            $validated['email']
        )->first();

        if (
            !$user ||
            !Hash::check(
                $validated['password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Email atau password salah.',
            ], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Akses hanya untuk admin.',
            ], 403);
        }

        $token = $user
            ->createToken('admin-token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()
            ->currentAccessToken()
            ?->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    public function forgotPassword(
        Request $request,
        PhpMailerService $mailer
    ) {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where(
            'email',
            $validated['email']
        )
            ->where('role', 'admin')
            ->first();

        /*
        Jangan memberitahu apakah email ditemukan
        untuk menghindari email enumeration.
        */
        if (!$user) {
            return response()->json([
                'message' =>
                    'Jika email terdaftar sebagai admin, kode reset akan dikirim.'
            ]);
        }

        PasswordResetOtp::where(
            'email',
            $user->email
        )->delete();

        $otp = (string) random_int(
            100000,
            999999
        );

        PasswordResetOtp::create([
            'email' => $user->email,
            'otp_hash' => Hash::make($otp),
            'expires_at' => now()->addMinutes(10),
        ]);

        try {
            $mailer->sendPasswordResetOtp(
                $user->email,
                $otp
            );
        } catch (\Throwable $e) {
            report($e);

            PasswordResetOtp::where(
                'email',
                $user->email
            )->delete();

            return response()->json([
                'message' =>
                    'Gagal mengirim email OTP. Periksa konfigurasi SMTP.',
            ], 500);
        }

        return response()->json([
            'message' =>
                'Jika email terdaftar sebagai admin, kode reset telah dikirim.',
        ]);
    }

    public function verifyResetOtp(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'otp' => [
                'required',
                'digits:6',
            ],
        ]);

        $reset = PasswordResetOtp::where(
            'email',
            $validated['email']
        )
            ->whereNull('used_at')
            ->latest()
            ->first();

        if (!$reset) {
            return response()->json([
                'message' =>
                    'Kode OTP tidak ditemukan. Silakan minta kode baru.',
            ], 422);
        }

        if (
            !$reset->expires_at ||
            now()->greaterThan($reset->expires_at)
        ) {
            return response()->json([
                'message' =>
                    'Kode OTP sudah kedaluwarsa. Silakan minta kode baru.',
            ], 422);
        }

        if (
            !$reset->otp_hash ||
            !Hash::check(
                $validated['otp'],
                $reset->otp_hash
            )
        ) {
            return response()->json([
                'message' => 'Kode OTP salah.',
            ], 422);
        }

        $resetToken = Str::random(64);

        $reset->update([
            'otp_hash' => null,
            'reset_token_hash' => hash(
                'sha256',
                $resetToken
            ),
            'expires_at' => now()->addMinutes(10),
        ]);

        return response()->json([
            'message' => 'OTP berhasil diverifikasi.',
            'reset_token' => $resetToken,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'reset_token' => 'required|string',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $reset = PasswordResetOtp::where(
            'email',
            $validated['email']
        )
            ->whereNull('used_at')
            ->latest()
            ->first();

        if (!$reset) {
            return response()->json([
                'message' =>
                    'Token reset tidak valid.',
            ], 422);
        }

        if (
            !$reset->expires_at ||
            now()->greaterThan($reset->expires_at)
        ) {
            return response()->json([
                'message' =>
                    'Token reset sudah kedaluwarsa.',
            ], 422);
        }

        $tokenValid =
            $reset->reset_token_hash &&
            hash_equals(
                $reset->reset_token_hash,
                hash(
                    'sha256',
                    $validated['reset_token']
                )
            );

        if (!$tokenValid) {
            return response()->json([
                'message' =>
                    'Token reset tidak valid.',
            ], 422);
        }

        $user = User::where(
            'email',
            $validated['email']
        )
            ->where('role', 'admin')
            ->first();

        if (!$user) {
            return response()->json([
                'message' =>
                    'Admin tidak ditemukan.',
            ], 404);
        }

        $user->update([
            'password' => $validated['password'],
        ]);

        /*
        Semua token lama dibatalkan.
        Setelah reset password, admin harus login kembali.
        */
        $user->tokens()->delete();

        $reset->update([
            'used_at' => now(),
            'reset_token_hash' => null,
        ]);

        PasswordResetOtp::where(
            'email',
            $user->email
        )->delete();

        return response()->json([
            'message' =>
                'Password berhasil diubah. Silakan login kembali.',
        ]);
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $user = $request->user();

        if (
            !Hash::check(
                $validated['current_password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' =>
                    'Password saat ini salah.',
            ], 422);
        }

        $user->update([
            'password' => $validated['password'],
        ]);

        /*
        Hapus token lain tetapi pertahankan
        token yang sedang dipakai.
        */
        $currentTokenId =
            $user->currentAccessToken()?->id;

        if ($currentTokenId) {
            $user->tokens()
                ->where(
                    'id',
                    '!=',
                    $currentTokenId
                )
                ->delete();
        }

        PasswordResetOtp::where(
            'email',
            $user->email
        )->delete();

        return response()->json([
            'message' =>
                'Password berhasil diubah.',
        ]);
    }
}