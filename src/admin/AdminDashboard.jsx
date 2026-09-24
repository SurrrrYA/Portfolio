import {
  useEffect,
  useRef,
  useState,
} from 'react'

import AddProject from './AddProject'
import EditProject from './EditProject'

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
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-9.5-6-9.5-6Z"
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

function MenuIcon() {
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
        d="M4 7h16M4 12h16M4 17h16"
      />
    </svg>
  )
}

function CloseIcon() {
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
        d="M6 6l12 12M18 6L6 18"
      />
    </svg>
  )
}

function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
  placeholder = '••••••••',
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
          required
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

function AdminDashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showAddProject, setShowAddProject] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProjectId, setDeletingProjectId] = useState(null)

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const addProjectRef = useRef(null)
  const editProjectRef = useRef(null)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [changingPassword, setChangingPassword] =
    useState(false)

  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'http://127.0.0.1:8000/api/projects'
      )

      if (!response.ok) {
        throw new Error('Gagal mengambil data project.')
      }

      const data = await response.json()

      setProjects(data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!editingProject) return

    const timer = setTimeout(() => {
      editProjectRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [editingProject])

  useEffect(() => {
    if (!showAddProject) return

    const timer = setTimeout(() => {
      addProjectRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [showAddProject])

  useEffect(() => {
    document.body.style.overflow =
      mobileSidebarOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileSidebarOpen])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const changeMenu = (menu) => {
    setActiveMenu(menu)

    setShowAddProject(false)
    setEditingProject(null)
    setError('')

    setMobileSidebarOpen(false)

    if (menu === 'settings') {
      setPasswordError('')
      setPasswordSuccess('')
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token')

    try {
      await fetch(
        'http://127.0.0.1:8000/api/logout',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')

      onLogout()
    }
  }

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus project "${project.title}"?`
    )

    if (!confirmed) return

    setDeletingProjectId(project.id)
    setError('')

    try {
      const token = localStorage.getItem('admin_token')

      const response = await fetch(
        `http://127.0.0.1:8000/api/projects/${project.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Gagal menghapus project.'
        )
      }

      setProjects((current) =>
        current.filter(
          (item) => item.id !== project.id
        )
      )

      if (editingProject?.id === project.id) {
        setEditingProject(null)
      }
    } catch (error) {
      console.error(error)
      setError(error.message)
    } finally {
      setDeletingProjectId(null)
    }
  }

  const handleChangePassword = async (event) => {
    event.preventDefault()

    setChangingPassword(true)
    setPasswordError('')
    setPasswordSuccess('')

    if (newPassword.length < 8) {
      setPasswordError(
        'Password baru minimal 8 karakter.'
      )
      setChangingPassword(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        'Konfirmasi password tidak sama.'
      )
      setChangingPassword(false)
      return
    }

    try {
      const token = localStorage.getItem('admin_token')

      const response = await fetch(
        'http://127.0.0.1:8000/api/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Gagal mengubah password.'
        )
      }

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      setShowCurrentPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)

      setPasswordSuccess(
        'Password berhasil diubah.'
      )
    } catch (error) {
      console.error(error)

      setPasswordError(
        error.message || 'Gagal mengubah password.'
      )
    } finally {
      setChangingPassword(false)
    }
  }

  const openAddProject = () => {
    setActiveMenu('projects')
    setShowAddProject(true)
    setEditingProject(null)
    setError('')
    setMobileSidebarOpen(false)
  }

  const pageTitle =
    activeMenu === 'dashboard'
      ? 'Dashboard'
      : activeMenu === 'projects'
        ? 'Projects'
        : 'Settings'

  const pageDescription =
    activeMenu === 'dashboard'
      ? 'Ringkasan portfolio kamu.'
      : activeMenu === 'projects'
        ? 'Kelola project yang tampil di portfolio.'
        : 'Kelola akun dan keamanan admin.'

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8faff] text-[#0f172a]">

      {/* MOBILE OVERLAY */}

      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() =>
            setMobileSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-[#0f172a]/10 bg-white transition-transform duration-300 ease-out lg:w-64 lg:translate-x-0 ${
          mobileSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        {/* SIDEBAR HEADER */}

        <div className="flex items-center justify-between border-b border-[#0f172a]/10 px-5 py-5 sm:px-6 sm:py-6">

          <div>
            <p className="font-[Manrope] text-xl font-semibold">
              SURYA
              <span className="text-[#2563eb]">.</span>
            </p>

            <p className="mt-1 text-xs text-[#64748b]">
              Admin Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748b] transition hover:bg-[#f1f5fd] hover:text-[#2563eb] lg:hidden"
            aria-label="Tutup sidebar"
          >
            <CloseIcon />
          </button>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-xs tracking-wider text-[#64748b]">
            Menu
          </p>

          <button
            type="button"
            onClick={() =>
              changeMenu('dashboard')
            }
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
              activeMenu === 'dashboard'
                ? 'bg-[#f1f5fd] font-medium text-[#2563eb]'
                : 'text-[#475569] hover:bg-[#f1f5fd] hover:text-[#0f172a]'
            }`}
          >
            <span className="text-xs">
              ■
            </span>

            Dashboard
          </button>

          <button
            type="button"
            onClick={() =>
              changeMenu('projects')
            }
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
              activeMenu === 'projects'
                ? 'bg-[#f1f5fd] font-medium text-[#2563eb]'
                : 'text-[#475569] hover:bg-[#f1f5fd] hover:text-[#0f172a]'
            }`}
          >
            <span className="text-xs">
              ▣
            </span>

            Projects
          </button>

          <button
            type="button"
            onClick={() =>
              changeMenu('settings')
            }
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
              activeMenu === 'settings'
                ? 'bg-[#f1f5fd] font-medium text-[#2563eb]'
                : 'text-[#475569] hover:bg-[#f1f5fd] hover:text-[#0f172a]'
            }`}
          >
            <span className="text-xs">
              ⚙
            </span>

            Settings
          </button>

        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="border-t border-[#0f172a]/10 p-4">

          <div className="mb-4 rounded-2xl bg-[#f8faff] px-3 py-3">
            <p className="truncate text-sm text-[#0f172a]">
              {user?.name}
            </p>

            <p className="mt-1 truncate text-xs text-[#64748b]">
              {user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl px-3 py-3 text-left text-sm text-[#475569] transition hover:bg-[#f1f5fd] hover:text-[#2563eb]"
          >
            ← Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <div className="min-h-screen lg:ml-64">

        {/* TOP HEADER */}

        <header className="sticky top-0 z-30 border-b border-[#0f172a]/10 bg-[#f8faff]/90 backdrop-blur-xl">

          <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

            {/* MOBILE MENU BUTTON */}

            <div className="flex min-w-0 items-center gap-3">

              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0f172a]/10 bg-white text-[#475569] transition hover:border-[#2563eb]/30 hover:text-[#2563eb] lg:hidden"
                aria-label="Buka menu"
              >
                <MenuIcon />
              </button>

              <div className="min-w-0">

                <p className="text-xs text-[#64748b] sm:text-sm">
                  Admin
                </p>

                <h1 className="truncate font-[Manrope] text-lg sm:text-xl">
                  {pageTitle}
                </h1>

                <p className="mt-1 hidden text-xs text-[#64748b] sm:block">
                  {pageDescription}
                </p>

              </div>

            </div>

            <a
              href="/"
              className="shrink-0 text-xs text-[#475569] transition hover:text-[#2563eb] sm:text-sm"
            >
              Lihat Portfolio ↗
            </a>

          </div>

        </header>

        {/* CONTENT */}

        <section className="px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

          {/* DASHBOARD */}

          {activeMenu === 'dashboard' && (
            <div>

              <div className="mb-8 sm:mb-10">

                <p className="mb-3 text-sm text-[#2563eb]">
                  Ringkasan
                </p>

                <h2 className="font-[Manrope] text-3xl tracking-tight sm:text-4xl">
                  Selamat datang, {user?.name}.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#475569] sm:text-base">
                  Kelola konten portofolio kamu dari sini.
                </p>

              </div>

              {/* STATS */}

              <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:mb-12 lg:grid-cols-3">

                <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-5 sm:p-6">

                  <p className="text-sm text-[#64748b]">
                    Total Proyek
                  </p>

                  <p className="mt-3 font-[Manrope] text-4xl">
                    {projects.length}
                  </p>

                </div>

                <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-5 sm:p-6">

                  <p className="text-sm text-[#64748b]">
                    Admin
                  </p>

                  <p className="mt-3 truncate font-[Manrope] text-xl sm:text-2xl">
                    {user?.name}
                  </p>

                </div>

                <div className="rounded-3xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-5 text-white sm:p-6">

                  <p className="text-sm text-white/75">
                    Status
                  </p>

                  <p className="mt-3 text-sm font-medium">
                    ● Sistem Aktif
                  </p>

                </div>

              </div>

              {/* QUICK ACTION */}

              <div className="border-t border-[#0f172a]/10 pt-8">

                <p className="text-sm text-[#2563eb]">
                  Quick Action
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <button
                    type="button"
                    onClick={openAddProject}
                    className="rounded-3xl border border-[#0f172a]/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#2563eb]/40 sm:p-6"
                  >
                    <p className="font-[Manrope] text-lg sm:text-xl">
                      Tambah Project
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#64748b]">
                      Tambahkan project baru ke portfolio.
                    </p>

                    <p className="mt-5 text-sm font-medium text-[#2563eb]">
                      Buka Projects →
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      changeMenu('settings')
                    }
                    className="rounded-3xl border border-[#0f172a]/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#2563eb]/40 sm:p-6"
                  >
                    <p className="font-[Manrope] text-lg sm:text-xl">
                      Keamanan Akun
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#64748b]">
                      Ubah password admin dari halaman settings.
                    </p>

                    <p className="mt-5 text-sm font-medium text-[#2563eb]">
                      Buka Settings →
                    </p>
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* PROJECTS */}

          {activeMenu === 'projects' && (
            <div>

              {/* PROJECT HEADER */}

              <div className="mb-8 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <p className="mb-3 text-sm text-[#2563eb]">
                    Konten
                  </p>

                  <h2 className="font-[Manrope] text-3xl tracking-tight sm:text-4xl">
                    Proyek
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#475569] sm:text-base">
                    Tambahkan, edit, atau hapus project portfolio.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddProject(true)
                    setEditingProject(null)
                    setError('')
                  }}
                  className="w-full rounded-full bg-[#2563eb] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] sm:w-auto"
                >
                  + Tambah Proyek
                </button>

              </div>

              {/* ADD FORM */}

              {showAddProject && (
                <div
                  ref={addProjectRef}
                  className="mb-8 scroll-mt-24"
                >
                  <AddProject
                    onCancel={() =>
                      setShowAddProject(false)
                    }
                    onSuccess={(newProject) => {
                      setProjects((current) => [
                        newProject,
                        ...current,
                      ])

                      setShowAddProject(false)
                    }}
                  />
                </div>
              )}

              {/* EDIT FORM */}

              {editingProject && (
                <div
                  ref={editProjectRef}
                  className="mb-8 scroll-mt-24"
                >
                  <EditProject
                    project={editingProject}
                    onCancel={() =>
                      setEditingProject(null)
                    }
                    onSuccess={(updatedProject) => {
                      setProjects((current) =>
                        current.map((project) =>
                          project.id === updatedProject.id
                            ? updatedProject
                            : project
                        )
                      )

                      setEditingProject(null)
                    }}
                  />
                </div>
              )}

              {/* ERROR */}

              {error && (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-50 px-4 py-4 text-sm leading-6 text-red-600 sm:px-6">
                  {error}
                </div>
              )}

              {/* LOADING */}

              {loading && (
                <div className="rounded-3xl border border-[#0f172a]/10 bg-white px-5 py-10 text-sm text-[#64748b] sm:px-6">
                  Memuat proyek...
                </div>
              )}

              {/* EMPTY */}

              {!loading &&
                !error &&
                projects.length === 0 && (
                  <div className="rounded-3xl border border-[#0f172a]/10 bg-white px-5 py-10 text-sm text-[#64748b] sm:px-6">
                    Belum ada project.
                  </div>
                )}

              {/* PROJECT LIST */}

              {!loading &&
                !error &&
                projects.length > 0 && (
                  <div className="overflow-hidden rounded-3xl border border-[#0f172a]/10 bg-white">

                    {projects.map(
                      (project, index) => (
                        <article
                          key={project.id}
                          className="border-b border-[#0f172a]/10 px-4 py-6 last:border-b-0 sm:px-6 sm:py-7"
                        >

                          <div className="flex flex-col gap-6">

                            {/* TOP */}

                            <div className="min-w-0">

                              <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#64748b]">

                                <span>
                                  {String(index + 1).padStart(
                                    2,
                                    '0'
                                  )}
                                </span>

                                <span>
                                  {project.year || '—'}
                                </span>

                                {project.images?.length >
                                  0 && (
                                  <span>
                                    {
                                      project.images
                                        .length
                                    }{' '}
                                    gambar
                                  </span>
                                )}

                              </div>

                              <h3 className="break-words font-[Manrope] text-lg sm:text-xl">
                                {project.title}
                              </h3>

                              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#475569]">
                                {project.description}
                              </p>

                              {project.technologies
                                ?.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">

                                  {project.technologies.map(
                                    (technology) => (
                                      <span
                                        key={technology}
                                        className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-2.5 py-1 text-xs text-[#334155]"
                                      >
                                        {technology}
                                      </span>
                                    )
                                  )}

                                </div>
                              )}

                            </div>

                            {/* ACTIONS */}

                            <div className="flex items-center gap-5 border-t border-[#0f172a]/10 pt-4 sm:justify-end sm:border-t-0 sm:pt-0">

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProject(
                                    project
                                  )

                                  setShowAddProject(
                                    false
                                  )

                                  setError('')
                                }}
                                className="text-sm text-[#475569] transition hover:text-[#2563eb]"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    project
                                  )
                                }
                                disabled={
                                  deletingProjectId ===
                                  project.id
                                }
                                className="text-sm text-[#64748b] transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {deletingProjectId ===
                                project.id
                                  ? 'Menghapus...'
                                  : 'Hapus'}
                              </button>

                            </div>

                          </div>

                        </article>
                      )
                    )}

                  </div>
                )}

            </div>
          )}

          {/* SETTINGS */}

          {activeMenu === 'settings' && (
            <div>

              <div className="mb-8 sm:mb-10">

                <p className="mb-3 text-sm text-[#2563eb]">
                  Account
                </p>

                <h2 className="font-[Manrope] text-3xl tracking-tight sm:text-4xl">
                  Settings
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#475569] sm:text-base">
                  Kelola informasi dan keamanan akun admin.
                </p>

              </div>

              {/* ACCOUNT */}

              <div className="mb-6 rounded-3xl border border-[#0f172a]/10 bg-white p-5 sm:p-6 md:p-8">

                <p className="text-xs tracking-[0.15em] text-[#64748b]">
                  AKUN ADMIN
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  <div className="min-w-0">

                    <p className="text-xs text-[#64748b]">
                      Nama
                    </p>

                    <p className="mt-2 break-words text-sm text-[#0f172a]">
                      {user?.name || '—'}
                    </p>

                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-[#64748b]">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm text-[#0f172a]">
                      {user?.email || '—'}
                    </p>

                  </div>

                </div>

              </div>

              {/* SECURITY */}

              <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-5 sm:p-6 md:p-8">

                <p className="text-xs tracking-[0.15em] text-[#64748b]">
                  KEAMANAN
                </p>

                <h3 className="mt-3 font-[Manrope] text-xl sm:text-2xl">
                  Ganti Password
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#64748b]">
                  Gunakan minimal 8 karakter untuk password baru.
                </p>

                <form
                  onSubmit={handleChangePassword}
                  className="mt-8 w-full max-w-xl space-y-6"
                >

                  <PasswordField
                    label="Password Saat Ini"
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(
                        event.target.value
                      )
                    }
                    showPassword={
                      showCurrentPassword
                    }
                    onToggle={() =>
                      setShowCurrentPassword(
                        (current) => !current
                      )
                    }
                  />

                  <PasswordField
                    label="Password Baru"
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(
                        event.target.value
                      )
                    }
                    showPassword={showNewPassword}
                    onToggle={() =>
                      setShowNewPassword(
                        (current) => !current
                      )
                    }
                  />

                  <PasswordField
                    label="Konfirmasi Password Baru"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    showPassword={
                      showConfirmPassword
                    }
                    onToggle={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                  />

                  {passwordError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="rounded-xl border border-green-500/20 bg-green-50 px-4 py-3 text-sm leading-6 text-green-600">
                      {passwordSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="w-full rounded-full bg-[#2563eb] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {changingPassword
                      ? 'Menyimpan...'
                      : 'Simpan Password'}
                  </button>

                </form>

              </div>

            </div>
          )}

        </section>

      </div>
    </main>
  )
}

export default AdminDashboard