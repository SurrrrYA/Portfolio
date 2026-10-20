import { useState } from 'react'

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6 0 9.5 7 9.5 7a18.4 18.4 0 0 1-3.1 3.9M6.1 6.1C3.7 7.7 2.5 12 2.5 12s3.5 7 9.5 7a9.8 9.8 0 0 0 3.1-.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
      />
    </svg>
  )
}

function PasswordInput({
  label,
  value,
  onChange,
  placeholder = '••••••••',
  required = true,
  minLength,
  showPassword,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#334155]">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 pr-12 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            showPassword
              ? 'Sembunyikan password'
              : 'Tampilkan password'
          }
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-[#eaf0fb] hover:text-[#2563eb]"
        >
          <EyeIcon open={showPassword} />
        </button>
      </div>
    </div>
  )
}

function AdminLogin({ onLoginSuccess }) {
  const [mode, setMode] = useState('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [otp, setOtp] = useState('')
  const [resetToken, setResetToken] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const resetMessages = () => {
    setError('')
    setSuccess('')
  }

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    resetMessages()

    try {
      const response = await fetch(
        'https://api.portfoliosurya.my.id/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Login gagal.'
        )
      }

      localStorage.setItem(
        'admin_token',
        data.token
      )

      localStorage.setItem(
        'admin_user',
        JSON.stringify(data.user)
      )

      onLoginSuccess(data.user)
    } catch (error) {
      console.error(error)

      setError(
        error.message || 'Login gagal.'
      )
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     FORGOT PASSWORD - SEND OTP
  ========================================================= */

  const handleForgotPassword = async (event) => {
    event.preventDefault()

    setLoading(true)
    resetMessages()

    try {
      const response = await fetch(
        'https://api.portfoliosurya.my.id/api/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Gagal mengirim kode OTP.'
        )
      }

      setSuccess(
        'Kode OTP sudah dikirim ke email admin.'
      )

      setMode('otp')
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          'Gagal mengirim kode OTP.'
      )
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     VERIFY OTP
  ========================================================= */

  const handleVerifyOtp = async (event) => {
    event.preventDefault()

    setLoading(true)
    resetMessages()

    try {
      const response = await fetch(
        'https://api.portfoliosurya.my.id/api/verify-reset-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Kode OTP tidak valid.'
        )
      }

      setResetToken(data.reset_token)

      setSuccess(
        'Kode OTP berhasil diverifikasi.'
      )

      setMode('reset')
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          'Kode OTP tidak valid.'
      )
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     RESET PASSWORD
  ========================================================= */

  const handleResetPassword = async (event) => {
    event.preventDefault()

    setLoading(true)
    resetMessages()

    if (newPassword.length < 8) {
      setError(
        'Password baru minimal 8 karakter.'
      )

      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError(
        'Konfirmasi password tidak sama.'
      )

      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        'https://api.portfoliosurya.my.id/api/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email,
            reset_token: resetToken,
            password: newPassword,
            password_confirmation:
              confirmPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Gagal mengubah password.'
        )
      }

      setSuccess(
        'Password berhasil diubah. Silakan login kembali.'
      )

      setPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setOtp('')
      setResetToken('')

      setShowPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)

      setMode('login')
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          'Gagal mengubah password.'
      )
    } finally {
      setLoading(false)
    }
  }

  /* =========================================================
     BACK TO LOGIN
  ========================================================= */

  const backToLogin = () => {
    setMode('login')

    setOtp('')
    setResetToken('')
    setNewPassword('')
    setConfirmPassword('')

    setShowPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)

    resetMessages()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8faff] px-6 text-[#0f172a]">
      <div className="w-full max-w-md rounded-3xl border border-[#0f172a]/10 bg-white p-8 md:p-10">

        {/* ===================================================
            LOGIN
        =================================================== */}

        {mode === 'login' && (
          <>
            <div className="mb-10">
              <p className="mb-4 text-sm text-[#2563eb]">
                Admin Panel
              </p>

              <h1 className="font-[Manrope] text-4xl tracking-tight">
                Selamat datang kembali.
              </h1>

              <p className="mt-4 text-[#475569]">
                Login untuk mengelola portofolio.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm text-[#334155]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm text-[#334155]">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot-email')
                      resetMessages()
                    }}
                    className="text-xs text-[#2563eb] transition hover:text-[#1d4ed8]"
                  >
                    Lupa password?
                  </button>
                </div>

                <PasswordInput
                  label=""
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  showPassword={showPassword}
                  onToggle={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-50 px-4 py-3 text-sm leading-6 text-green-600">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#2563eb] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Sedang masuk...'
                  : 'Login'}
              </button>
            </form>
          </>
        )}

        {/* ===================================================
            FORGOT PASSWORD
        =================================================== */}

        {mode === 'forgot-email' && (
          <>
            <div className="mb-10">
              <p className="mb-4 text-sm text-[#2563eb]">
                Reset Password
              </p>

              <h1 className="font-[Manrope] text-4xl tracking-tight">
                Lupa password?
              </h1>

              <p className="mt-4 leading-7 text-[#475569]">
                Masukkan email admin. Kami akan
                mengirimkan kode OTP ke email tersebut.
              </p>
            </div>

            <form
              onSubmit={handleForgotPassword}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm text-[#334155]">
                  Email Admin
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#2563eb] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Mengirim OTP...'
                  : 'Kirim OTP'}
              </button>

              <button
                type="button"
                onClick={backToLogin}
                className="w-full text-sm text-[#475569] transition hover:text-[#2563eb]"
              >
                ← Kembali ke login
              </button>
            </form>
          </>
        )}

        {/* ===================================================
            OTP
        =================================================== */}

        {mode === 'otp' && (
          <>
            <div className="mb-10">
              <p className="mb-4 text-sm text-[#2563eb]">
                Verifikasi OTP
              </p>

              <h1 className="font-[Manrope] text-4xl tracking-tight">
                Masukkan kode OTP.
              </h1>

              <p className="mt-4 leading-7 text-[#475569]">
                Kode 6 digit sudah dikirim ke email admin.
              </p>
            </div>

            <form
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm text-[#334155]">
                  Kode OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) =>
                    setOtp(
                      event.target.value
                        .replace(/\D/g, '')
                        .slice(0, 6)
                    )
                  }
                  placeholder="123456"
                  required
                  className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-center text-xl font-semibold tracking-[0.35em] text-[#0f172a] outline-none transition focus:border-[#2563eb]"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-green-500/20 bg-green-50 px-4 py-3 text-sm leading-6 text-green-600">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loading || otp.length !== 6
                }
                className="w-full rounded-full bg-[#2563eb] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Memverifikasi...'
                  : 'Verifikasi OTP'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('forgot-email')
                  setOtp('')
                  resetMessages()
                }}
                className="w-full text-sm text-[#475569] transition hover:text-[#2563eb]"
              >
                ← Kirim ulang OTP
              </button>
            </form>
          </>
        )}

        {/* ===================================================
            RESET PASSWORD
        =================================================== */}

        {mode === 'reset' && (
          <>
            <div className="mb-10">
              <p className="mb-4 text-sm text-[#2563eb]">
                Password Baru
              </p>

              <h1 className="font-[Manrope] text-4xl tracking-tight">
                Buat password baru.
              </h1>

              <p className="mt-4 leading-7 text-[#475569]">
                Gunakan minimal 8 karakter untuk password
                baru kamu.
              </p>
            </div>

            <form
              onSubmit={handleResetPassword}
              className="space-y-6"
            >
              <PasswordInput
                label="Password Baru"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                minLength={8}
                showPassword={showNewPassword}
                onToggle={() =>
                  setShowNewPassword(
                    (current) => !current
                  )
                }
              />

              <PasswordInput
                label="Konfirmasi Password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                minLength={8}
                showPassword={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
              />

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#2563eb] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? 'Menyimpan password...'
                  : 'Simpan Password Baru'}
              </button>
            </form>
          </>
        )}

        <a
          href="/"
          className="mt-8 inline-block text-sm text-[#475569] transition hover:text-[#2563eb]"
        >
          ← Kembali ke portofolio
        </a>

      </div>
    </main>
  )
}

export default AdminLogin