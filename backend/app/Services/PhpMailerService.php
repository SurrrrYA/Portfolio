<?php

namespace App\Services;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class PhpMailerService
{
    public function sendPasswordResetOtp(
        string $email,
        string $otp
    ): void {
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host = env('MAIL_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = env('MAIL_USERNAME');
        $mail->Password = env('MAIL_PASSWORD');
        $mail->Port = (int) env('MAIL_PORT', 587);

        $encryption = env('MAIL_ENCRYPTION', 'tls');

        if ($encryption === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }

        $mail->setFrom(
            env('MAIL_FROM_ADDRESS'),
            env('MAIL_FROM_NAME', 'Portfolio')
        );

        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Kode Reset Password Admin';

        $mail->Body = "
            <div style=\"font-family: Arial, sans-serif; background:#f8faff; padding:40px;\">
                <div style=\"max-width:560px; margin:auto; background:#ffffff; padding:32px; border-radius:20px;\">
                    <h2 style=\"margin-top:0; color:#0f172a;\">
                        Reset Password Admin
                    </h2>

                    <p style=\"color:#475569; line-height:1.7;\">
                        Gunakan kode OTP berikut untuk membuat password baru:
                    </p>

                    <div style=\"
                        margin:28px 0;
                        padding:18px;
                        text-align:center;
                        font-size:32px;
                        font-weight:bold;
                        letter-spacing:8px;
                        color:#2563eb;
                        background:#f1f5fd;
                        border-radius:14px;
                    \">
                        {$otp}
                    </div>

                    <p style=\"color:#64748b; line-height:1.7;\">
                        Kode ini berlaku selama 10 menit.
                        Jangan bagikan kode ini kepada orang lain.
                    </p>

                    <p style=\"margin-bottom:0; color:#64748b;\">
                        Portfolio Admin
                    </p>
                </div>
            </div>
        ";

        $mail->AltBody =
            "Kode reset password admin: {$otp}. " .
            "Kode berlaku selama 10 menit.";

        $mail->send();
    }
}