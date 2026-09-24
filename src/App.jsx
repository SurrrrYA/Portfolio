import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ProjectDetail from './ProjectDetail'

/* =========================================================
   PALET WARNA
========================================================= */

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const rise = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/* =========================================================
   DATA TENTANG SAYA
========================================================= */

const journalUrl =
  'https://hostjournals.com/bulletincsr/article/view/1304'

const skillGroups = [
  {
    title: 'Development',
    items: [
      'PHP',
      'Kotlin',
      'SQL',
      'HTML',
      'CSS',
      'Laravel',
      'React',
      'Tailwind CSS',
      'Bootstrap',
      'REST API',
      'Volley',
    ],
  },

  {
    title: 'Database & Tools',
    items: [
      'MySQL',
      'Vite',
      'Database Management',
      'Firebase',
      'Git',
      'GitHub',
      'ESLint',
      'PHPMailer',
    ],
  },

  {
    title: 'Software Engineering',
    items: [
      'SDLC',
      'System Analysis',
      'Logical Thinking',
      'Problem Solving',
      'Usability Testing',
    ],
  },

  {
    title: 'Soft Skills',
    items: [
      'Adaptability',
      'Fast Learner',
      'Communication',
      'Teamwork',
    ],
  },
]

const experiences = [
  {
    role: 'Mobile App Developer - Freelance',
    company: 'Bengkel Motor Sempoeloer',
    period: 'Juni — Agustus 2026',
    description:
      'Merancang dan membangun aplikasi Android manajemen servis dengan fitur pemantauan progres secara real-time. Bertanggung jawab atas analisis sistem, perancangan basis data MySQL, serta pengembangan REST API berbasis PHP dan Kotlin, dilengkapi panel admin web berbasis Bootstrap.',
  },

  {
    role: 'Administrasi Pengadaan',
    company: 'CV. Anugerah Serayu Logistik',
    period: 'Maret — April 2026',
    description:
      'Mengelola alur E-Procurement perusahaan di portal E-Katalog pemerintah atau INAPROC: validasi dokumen legalitas, pengaturan zonasi layanan, dan pengunggahan etalase armada transportasi darat agar siap ditransaksikan oleh instansi pemerintah secara digital.',
  },

  {
    role: 'Anggota KPPS — Operator SIREKAP',
    company: 'KPU Kabupaten Banyumas',
    period: 'Februari 2024',
    description:
      'Bertugas sebagai Operator SIREKAP pada Pemilu 2024: digitalisasi dan entri data perolehan suara secara real-time, serta verifikasi akurasi data hasil pemungutan suara menggunakan teknologi OCR/OMR pada aplikasi Mobile SIREKAP di tingkat TPS.',
  },
]

const certificates = [
  {
    title: 'Pemrogram / Programmer',
    organization:
      'Badan Nasional Sertifikasi Profesi · 2026',
    url:
      'https://drive.google.com/file/d/1hn42fhy-6bw-_ddwlT2BppOIkcpXnaK1/view?usp=drive_link',
  },

  {
    title: 'English Proficiency Certificate',
    organization:
      'LDC Universitas Muhammadiyah Purwokerto · 2024',
    url:
      'https://drive.google.com/file/d/1FEZNbEDS_EA6Su2X8qwrihZKGdzMvu9o/view?usp=sharing',
  },

  {
    title: 'Digital Skill Fair 12.0',
    organization: 'Dibimbing.id · 2022',
    url:
      'https://drive.google.com/file/d/1ZVSH6ZjwPO88ZeUSqJcSMJZOHBPhVo7d/view?usp=drive_link',
  },

  {
    title: 'Design & Content Development (DECODE)',
    organization:
      'BEM Fakultas Ilmu Kesehatan · 2025',
    url:
      'https://drive.google.com/file/d/1AwGgsEcplu-xczIDnupuEX47VoA64dyo/view?usp=drive_link',
  },

  {
    title: 'Informatics Guest Lecture — Exploring AI',
    organization:
      'Prodi Informatika UMP · 2026',
    url:
      'https://drive.google.com/file/d/1M0vfnA48a35r3o4dK8tvxTtAvWmcW_f8/view?usp=drive_link',
  },

  {
    title: 'Baitrul Arqam',
    organization:
      'Career Competencies & Soft Skills',
    url:
      'https://drive.google.com/file/d/14-FmR6cLfMz4skhj20Th6Xkas_PsUr9m/view?usp=drive_link',
  },
]

const marqueeItems = [
  ...skillGroups[0].items,
  ...skillGroups[1].items,
]

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ children }) {
  return (
    <p className="text-sm text-[#2563eb]">
      {children}
    </p>
  )
}

/* =========================================================
   ICON PANAH
========================================================= */

function IconChevronLeft({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function IconChevronRight({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
  return (
    <section
      id="about"
      className="border-t border-[#0f172a]/10"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10">

        {/* HEADER */}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <motion.div variants={rise}>
            <SectionLabel>
              01 — TENTANG SAYA
            </SectionLabel>
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-8 max-w-5xl font-[Manrope] text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-6xl lg:text-7xl"
          >
            Software developer yang{' '}
            <span className="text-[#2563eb]">
              membangun
            </span>{' '}
            dari nol.
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-8 max-w-2xl text-base leading-8 text-[#475569] md:text-lg"
          >
            Saya mengerjakan pengembangan aplikasi secara
            menyeluruh: dari analisis kebutuhan dan
            perancangan basis data, membangun aplikasi
            mobile dan backend, sampai pengujian dan
            debugging secara sistematis. Salah satu hasilnya
            adalah aplikasi manajemen bengkel motor berbasis
            Android (Kotlin), dengan backend PHP dan MySQL
            yang dilengkapi REST API, autentikasi Firebase,
            dan panel admin berbasis Bootstrap.
          </motion.p>
        </motion.div>

        {/* STRIP TEKNOLOGI */}

        <div className="mt-16 overflow-hidden border-y border-[#0f172a]/10 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 32,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...marqueeItems, ...marqueeItems].map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-10 whitespace-nowrap pr-10 font-[Manrope] text-xl text-[#64748b]"
                >
                  {item}

                  <span className="h-4 w-px bg-[#0f172a]/15" />
                </span>
              )
            )}
          </motion.div>
        </div>

        {/* BENTO */}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-16 grid gap-4 lg:grid-cols-3"
        >
          {/* SIAPA SAYA */}

          <motion.div
            variants={rise}
            className="rounded-3xl border border-[#0f172a]/10 bg-white p-8 transition duration-300 hover:border-[#2563eb]/40 md:p-10 lg:col-span-2"
          >
            <p className="text-xs tracking-[0.15em] text-[#64748b]">
              SIAPA SAYA
            </p>

            <p className="mt-8 font-[Manrope] text-2xl leading-[1.5] tracking-tight text-[#0f172a] md:text-3xl md:leading-[1.45]">
              Fresh graduate S1 Teknik Informatika
              Universitas Muhammadiyah Purwokerto dengan
              peminatan Rekayasa Perangkat Lunak.
            </p>

            <p className="mt-8 border-t border-[#0f172a]/10 pt-5 text-sm text-[#64748b]">
              Domisili: Purwokerto Utara, Banyumas, Jawa Tengah.
            </p>
          </motion.div>

          {/* IPK */}

          <motion.div
            variants={rise}
            className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#2563eb] to-[#1e40af] p-8 text-white md:p-10"
          >
            <div className="flex items-center justify-between text-xs tracking-[0.15em] text-white/75">
              <span>IPK</span>
              <span>2022 — 2026</span>
            </div>

            <div className="mt-14">
              <p className="font-[Manrope] text-7xl font-semibold leading-none tracking-tighter md:text-8xl">
                3.73
              </p>

              <p className="mt-3 text-sm text-white/85">
                dari 4.00 · Teknik Informatika
              </p>

              <p className="mt-6 border-t border-white/25 pt-5 text-sm leading-6 text-white/85">
                Tugas akhir jalur non-skripsi melalui artikel
                ilmiah terakreditasi Sinta 4 di Bulletin of
                Computer Science Research (Vol. 6 No. 5).{' '}

                {journalUrl && (
                  <a
                    href={journalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white underline underline-offset-4 transition hover:text-white/80"
                  >
                    Baca artikel ↗
                  </a>
                )}
              </p>
            </div>
          </motion.div>

          {/* KEAHLIAN */}

          <motion.div
            variants={rise}
            className="rounded-3xl border border-[#0f172a]/10 bg-white p-8 md:p-10 lg:col-span-3"
          >
            <p className="text-xs tracking-[0.15em] text-[#64748b]">
              KEAHLIAN
            </p>

            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-4 text-sm font-medium text-[#0f172a]">
                    {group.title}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-3.5 py-1.5 text-sm text-[#334155] transition hover:border-[#2563eb] hover:bg-[#2563eb]/5 hover:text-[#2563eb]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* PENGALAMAN KERJA */}

        <div className="mt-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-[Manrope] text-3xl tracking-tight md:text-5xl">
              Pengalaman
              <br />
              kerja
            </h3>
          </div>

          <div className="space-y-4">
            {experiences.map((experience) => (
              <motion.article
                key={experience.role}
                variants={rise}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className="rounded-3xl border border-[#0f172a]/10 bg-white p-8 transition duration-300 hover:border-[#2563eb]/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#2563eb]">
                    {experience.company}
                  </p>

                  <span className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-3 py-1 text-xs text-[#475569]">
                    {experience.period}
                  </span>
                </div>

                <h4 className="mt-5 font-[Manrope] text-xl md:text-2xl">
                  {experience.role}
                </h4>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#475569]">
                  {experience.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* SERTIFIKASI */}

        <div className="mt-28">
          <h3 className="font-[Manrope] text-3xl tracking-tight md:text-5xl">
            Sertifikasi &amp; pelatihan
          </h3>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => {
              const hasLink = Boolean(certificate.url)

              const Card = hasLink
                ? motion.a
                : motion.div

              const linkProps = hasLink
                ? {
                    href: certificate.url,
                    target: '_blank',
                    rel: 'noreferrer',
                  }
                : {}

              return (
                <Card
                  key={certificate.title}
                  {...linkProps}
                  variants={rise}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  className="block rounded-2xl border border-[#0f172a]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748b]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {hasLink && (
                      <span className="text-xs text-[#2563eb]">
                        Lihat sertifikat ↗
                      </span>
                    )}
                  </div>

                  <h4 className="mt-8 font-[Manrope] text-lg leading-snug">
                    {certificate.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-[#64748b]">
                    {certificate.organization}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] =
    useState(true)

  const [activeProject, setActiveProject] =
    useState(0)

  const [direction, setDirection] = useState(1)

  const [adminUser, setAdminUser] = useState(() => {
    const savedUser =
      localStorage.getItem('admin_user')

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const isAdminPage =
    window.location.pathname === '/admin'

  const projectDetailMatch =
    window.location.pathname.match(
      /^\/projects\/(\d+)$/
    )

  const isProjectDetailPage =
    Boolean(projectDetailMatch)

  const projectDetailId =
    projectDetailMatch?.[1]

  /* =========================================================
     GET PROJECTS
  ========================================================= */

  useEffect(() => {
    fetch(
      'http://127.0.0.1:8000/api/projects'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Gagal mengambil data project.'
          )
        }

        return response.json()
      })
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      .finally(() => {
        setLoadingProjects(false)
      })
  }, [])

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image) {
      return ''
    }

    if (image.startsWith('http')) {
      return image
    }

    return `http://127.0.0.1:8000/storage/${image}`
  }

  /* =========================================================
     OPEN PROJECT DETAIL
  ========================================================= */

  const openProjectDetail = (projectId) => {
    window.location.href =
      `/projects/${projectId}`
  }

  /* =========================================================
     CAROUSEL NAVIGATION
  ========================================================= */

  const goToPrevProject = () => {
    setDirection(-1)

    setActiveProject((current) =>
      current === 0
        ? projects.length - 1
        : current - 1
    )
  }

  const goToNextProject = () => {
    setDirection(1)

    setActiveProject((current) =>
      current === projects.length - 1
        ? 0
        : current + 1
    )
  }

  const goToProject = (index) => {
    setDirection(
      index > activeProject ? 1 : -1
    )

    setActiveProject(index)
  }

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),

    center: {
      opacity: 1,
      x: 0,
    },

    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  }

  /* =========================================================
     ADMIN LOGIN
  ========================================================= */

  if (isAdminPage && !adminUser) {
    return (
      <AdminLogin
        onLoginSuccess={setAdminUser}
      />
    )
  }

  /* =========================================================
     ADMIN DASHBOARD
  ========================================================= */

  if (isAdminPage && adminUser) {
    return (
      <AdminDashboard
        user={adminUser}
        onLogout={() => {
          localStorage.removeItem(
            'admin_user'
          )

          localStorage.removeItem(
            'admin_token'
          )

          setAdminUser(null)
        }}
      />
    )
  }

  /* =========================================================
     PROJECT DETAIL
  ========================================================= */

  if (isProjectDetailPage) {
    return (
      <ProjectDetail
        projectId={projectDetailId}
        onBack={() => {
          window.location.href =
            '/#projects'
        }}
      />
    )
  }

  /* =========================================================
     MAIN PORTFOLIO
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f8faff] text-[#0f172a]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-[#0f172a]/10 bg-[#f8faff]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">

          <a
            href="#home"
            className="font-[Manrope] text-lg font-semibold tracking-tight"
          >
            SURYA
            <span className="text-[#2563eb]">
              .
            </span>
          </a>

          <div className="flex items-center gap-6 text-sm text-[#475569] md:gap-8">

            <a
              href="#about"
              className="transition hover:text-[#0f172a]"
            >
              Tentang
            </a>

            <a
              href="#projects"
              className="transition hover:text-[#0f172a]"
            >
              Proyek
            </a>

            <a
              href="#contact"
              className="transition hover:text-[#0f172a]"
            >
              Kontak
            </a>

          </div>

        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-20 md:px-10"
      >
        <div className="max-w-6xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-8 text-sm"
          >
            <span className="text-[#2563eb]">
              Purwokerto Utara, Banyumas
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="max-w-6xl font-[Manrope] text-5xl font-medium leading-[0.96] tracking-[-0.045em] md:text-7xl lg:text-[6.25rem]"
          >
            Halo, saya
            <br />

            <span className="text-[#2563eb]">
              Ardiansyah Surya Pratama.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="mt-10 max-w-2xl text-xl leading-8 text-[#334155] md:text-2xl md:leading-9"
          >
            Fresh graduate S1 Teknik Informatika
            peminatan RPL yang berminat menjadi software
            developer. Saya membangun aplikasi Android
            dengan Kotlin dan backend dengan PHP dan
            MySQL.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              className="rounded-full bg-[#2563eb] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8]"
            >
              Lihat proyek
            </a>

            <a
              href="#about"
              className="text-sm text-[#475569] transition hover:text-[#0f172a]"
            >
              Tentang saya
            </a>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <About />

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        id="projects"
        className="border-t border-[#0f172a]/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10">

          {/* HEADER */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="mb-16"
          >
            <motion.div variants={rise}>
              <SectionLabel>
                02 — PROYEK
              </SectionLabel>
            </motion.div>

            <motion.h2
              variants={rise}
              className="mt-8 max-w-4xl font-[Manrope] text-4xl font-medium leading-[1.04] tracking-[-0.035em] md:text-6xl lg:text-7xl"
            >
              Proyek yang pernah
              <br className="hidden md:block" />{' '}
              saya{' '}
              <span className="text-[#2563eb]">
                kerjakan.
              </span>
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-8 max-w-xl leading-8 text-[#475569]"
            >
              Wesite dan Aplikasi yang saya kerjakan dari analisis
              sistem, perancangan database, sampai
              pengujian. Geser untuk melihat proyek
              lainnya.
            </motion.p>
          </motion.div>

          {/* PROJECT CAROUSEL */}

          {loadingProjects ? (
            <div className="rounded-3xl border border-[#0f172a]/10 bg-white py-10 text-center text-sm text-[#64748b]">
              Memuat proyek...
            </div>
          ) : projects.length > 0 ? (
            <div className="relative">

              {/* TOMBOL KIRI */}

              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={goToPrevProject}
                  aria-label="Proyek sebelumnya"
                  className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] shadow-lg shadow-[#0f172a]/5 transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:flex"
                >
                  <IconChevronLeft size={20} />
                </button>
              )}

              {/* TOMBOL KANAN */}

              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={goToNextProject}
                  aria-label="Proyek berikutnya"
                  className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] shadow-lg shadow-[#0f172a]/5 transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:flex"
                >
                  <IconChevronRight size={20} />
                </button>
              )}

              {/* CARD */}

              <div className="overflow-hidden rounded-3xl">
                <AnimatePresence
                  mode="wait"
                  custom={direction}
                >
                  {(() => {
                    const project =
                      projects[activeProject]

                    const coverImage =
                      project.images?.[0]?.image ||
                      project.image

                    return (
                      <motion.article
                        key={project.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.35,
                          ease: 'easeOut',
                        }}
                        className="grid overflow-hidden rounded-3xl border border-[#0f172a]/10 bg-white transition duration-300 hover:border-[#2563eb]/40 md:min-h-[420px] md:grid-cols-2"
                      >

                        {/* IMAGE PROJECT */}

                        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#eef3fb] sm:aspect-[16/10] md:h-[420px] md:aspect-auto">

                          {coverImage ? (
                            <img
                              src={getImageUrl(
                                coverImage
                              )}
                              alt={project.title}
                              className="h-full w-full object-contain p-4 md:p-6"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">
                              BELUM ADA GAMBAR
                            </div>
                          )}

                          {/* PROJECT NUMBER */}

                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] text-[#475569] shadow-sm backdrop-blur md:left-5 md:top-5 md:px-3 md:py-1.5 md:text-xs">
                            {String(
                              activeProject + 1
                            ).padStart(2, '0')}

                            {' / '}

                            {String(
                              projects.length
                            ).padStart(2, '0')}
                          </div>
                        </div>

                        {/* INFO */}

                        <div className="flex flex-col justify-between p-5 md:p-10">

                          <div>

                            <div className="flex items-center justify-between text-xs tracking-[0.15em] text-[#64748b]">
                              <span>
                                PROYEK
                              </span>

                              <span>
                                {project.year || '—'}
                              </span>
                            </div>

                            <h3 className="mt-4 font-[Manrope] text-xl leading-tight tracking-tight md:mt-6 md:text-3xl">
                              {project.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[#475569] md:mt-4 md:text-base md:leading-7">
                              {project.description}
                            </p>

                            {project.technologies?.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
                                {project.technologies.map(
                                  (technology) => (
                                    <span
                                      key={technology}
                                      className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-2.5 py-1 text-[11px] text-[#334155] md:px-3 md:py-1.5 md:text-xs"
                                    >
                                      {technology}
                                    </span>
                                  )
                                )}
                              </div>
                            )}

                            {project.images?.length > 1 && (
                              <p className="mt-4 text-xs text-[#64748b] md:mt-5">
                                {project.images.length}{' '}
                                gambar proyek
                              </p>
                            )}

                          </div>

                          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-8 md:gap-x-6 md:gap-y-4">

                            <button
                              type="button"
                              onClick={() =>
                                openProjectDetail(
                                  project.id
                                )
                              }
                              className="rounded-full bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1d4ed8] md:px-5 md:py-2.5"
                            >
                              Lihat proyek
                            </button>

                            {project.case_study && (
                              <a
                                href={project.case_study}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-[#475569] transition hover:text-[#2563eb]"
                              >
                                Studi kasus
                              </a>
                            )}

                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-[#64748b] transition hover:text-[#0f172a]"
                              >
                                GitHub
                              </a>
                            )}

                            {project.demo_url && (
                              <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-[#64748b] transition hover:text-[#0f172a]"
                              >
                                Demo
                              </a>
                            )}

                          </div>

                        </div>
                      </motion.article>
                    )
                  })()}
                </AnimatePresence>
              </div>

              {/* MOBILE CONTROLS + DOT */}

              {projects.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-6">

                  <button
                    type="button"
                    onClick={goToPrevProject}
                    aria-label="Proyek sebelumnya"
                    className="flex items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:hidden"
                  >
                    <IconChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {projects.map(
                      (project, index) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() =>
                            goToProject(index)
                          }
                          aria-label={`Ke proyek ${index + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            index === activeProject
                              ? 'w-6 bg-[#2563eb]'
                              : 'w-2 bg-[#0f172a]/15 hover:bg-[#0f172a]/30'
                          }`}
                        />
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={goToNextProject}
                    aria-label="Proyek berikutnya"
                    className="flex items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:hidden"
                  >
                    <IconChevronRight size={18} />
                  </button>

                </div>
              )}

            </div>
          ) : (
            <div className="rounded-3xl border border-[#0f172a]/10 bg-white py-10 text-center text-sm text-[#64748b]">
              Belum ada proyek.
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="border-t border-[#0f172a]/10"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mx-auto max-w-7xl px-6 py-32 md:px-10"
        >

          <motion.div variants={rise}>
            <SectionLabel>
              03 — KONTAK
            </SectionLabel>
          </motion.div>

          <motion.h2
            variants={rise}
            className="mt-8 max-w-4xl font-[Manrope] text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-7xl lg:text-8xl"
          >
            Ingin mengenal
            <br />

            <span className="text-[#2563eb]">
              saya lebih jauh?
            </span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-8 max-w-xl leading-8 text-[#475569]"
          >
            Saya terbuka untuk peluang kerja, proyek,
            maupun sekadar berdiskusi. Silakan hubungi
            saya melalui salah satu akun di bawah.
          </motion.p>

          {/* SOCIAL LINKS */}

          <motion.div
            variants={rise}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              {
                label: 'Email',
                href: 'mailto:spratama029@gmail.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/SurrrrYA',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/ardiansyah-surya-pratama-60576a42b',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/ciooo_ty?stkn=aHh2OXp1a2I2NzNq',
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.label === 'Email'
                    ? undefined
                    : '_blank'
                }
                rel={
                  social.label === 'Email'
                    ? undefined
                    : 'noreferrer'
                }
                className="rounded-full border border-[#0f172a]/10 bg-white px-5 py-2.5 text-sm text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                {social.label}
              </a>
            ))}
          </motion.div>

        </motion.div>
      </section>

    </main>
  )
}

export default App