import { useEffect, useState } from 'react'

import {

  motion,

  AnimatePresence,

  MotionConfig,

} from 'framer-motion'

import AdminLogin from './admin/AdminLogin'

import AdminDashboard from './admin/AdminDashboard'

import ProjectDetail from './ProjectDetail'

const API_BASE_URL = import.meta.env.DEV
  ? 'https://api.portfoliosurya.my.id/api'
  : 'https://api.portfoliosurya.my.id/api'

const focusRing =

  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]'

const h2Class =

  'font-[Manrope] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-5xl lg:text-6xl'

const h3Class =

  'font-[Manrope] text-3xl font-semibold tracking-tight md:text-4xl'

const stagger = {

  hidden: {},

  visible: {

    transition: {

      staggerChildren: 0.08,

    },

  },

}

const rise = {

  hidden: {

    opacity: 0,

    y: 18,

  },

  visible: {

    opacity: 1,

    y: 0,

    transition: {

      duration: 0.55,

      ease: 'easeOut',

    },

  },

}

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

      'Merancang dan membangun aplikasi Android untuk manajemen servis, lengkap dengan pemantauan progres secara real-time. Saya menangani analisis sistem, perancangan basis data MySQL, pengembangan REST API berbasis PHP dan Kotlin, serta panel admin web berbasis Bootstrap.',

  },

  {

    role: 'Administrasi Pengadaan',

    company: 'CV. Anugerah Serayu Logistik',

    period: 'Maret — April 2026',

    description:

      'Mengelola alur E-Procurement perusahaan di E-Katalog pemerintah (INAPROC): memvalidasi dokumen legalitas, mengatur zonasi layanan, dan mengunggah etalase armada transportasi darat agar siap ditransaksikan oleh instansi pemerintah secara digital.',

  },

]

const socials = [

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

]

const marqueeItems = [

  ...skillGroups[0].items,

  ...skillGroups[1].items,

]

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

      aria-hidden="true"

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

      aria-hidden="true"

    >

      <path d="M9 18l6-6-6-6" />

    </svg>

  )

}

function IconArrowUpRight({ size = 18 }) {

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

      aria-hidden="true"

    >

      <path d="M7 17L17 7" />

      <path d="M8 7h9v9" />

    </svg>

  )

}

function IconPin({ size = 16 }) {

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

      aria-hidden="true"

    >

      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />

      <circle cx="12" cy="10" r="3" />

    </svg>

  )

}

function About({ certificates = [] }) {

  return (

    <section

      id="about"

      className="scroll-mt-16 border-t border-[#0f172a]/10"

    >

      {/* HEADING */}

      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">

        <motion.div

          variants={stagger}

          initial="hidden"

          whileInView="visible"

          viewport={{

            once: true,

            amount: 0.2,

          }}

          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"

        >

          <motion.h2 variants={rise} className={h2Class}>

            Full-Stack Developer yang senang membangun dari

            nol.

          </motion.h2>

          <motion.p

            variants={rise}

            className="text-base leading-8 text-[#475569] md:text-lg"

          >

            Saya menangani pengembangan aplikasi secara

            menyeluruh: mulai dari analisis kebutuhan dan

            perancangan basis data, pembuatan aplikasi

            mobile dan backend, hingga pengujian dan

            debugging yang sistematis. Salah satu hasilnya

            adalah aplikasi manajemen bengkel motor berbasis

            Android (Kotlin), didukung backend PHP dan MySQL

            dengan REST API, autentikasi Firebase, serta

            panel admin berbasis Bootstrap.

          </motion.p>

        </motion.div>

      </div>

      {/* MARQUEE */}

      <div

        className="mt-16 overflow-hidden border-y border-[#0f172a]/10 bg-white py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"

        aria-hidden="true"

      >

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

                <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]/40" />

              </span>

            )

          )}

        </motion.div>

      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-10 md:pb-32">

        {/* BENTO */}

        <motion.div

          variants={stagger}

          initial="hidden"

          whileInView="visible"

          viewport={{

            once: true,

            amount: 0.1,

          }}

          className="grid gap-4 lg:grid-cols-3"

        >

          {/* SIAPA SAYA */}

          <motion.div

            variants={rise}

            className="flex flex-col justify-between rounded-[2rem] border border-[#0f172a]/10 bg-white p-8 md:p-10 lg:col-span-2"

          >

            <p className="text-sm font-medium text-[#2563eb]">

              Siapa saya

            </p>

            <p className="mt-10 font-[Manrope] text-2xl font-medium leading-[1.45] tracking-tight text-[#0f172a] md:text-3xl md:leading-[1.4]">

              Fresh graduate S1 Teknik Informatika

              Universitas Muhammadiyah Purwokerto, dengan

              peminatan Rekayasa Perangkat Lunak.

            </p>

            <p className="mt-10 flex items-center gap-2 border-t border-[#0f172a]/10 pt-5 text-sm text-[#64748b]">

              <IconPin />

              Berdomisili di Purwokerto Utara, Banyumas,

              Jawa Tengah.

            </p>

          </motion.div>

          {/* IPK */}

          <motion.div

            variants={rise}

            className="flex flex-col justify-between rounded-[2rem] bg-[#2563eb] p-8 text-white md:p-10"

          >

            <div className="flex items-center justify-between text-sm text-white/80">

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

                Tugas akhir saya selesaikan lewat jalur

                non-skripsi, berupa artikel ilmiah

                terakreditasi Sinta 4 di Bulletin of

                Computer Science Research (Vol. 6 No. 5).{' '}

                {journalUrl && (

                  <a

                    href={journalUrl}

                    target="_blank"

                    rel="noreferrer"

                    className={`inline-flex items-center gap-1 font-medium text-white underline underline-offset-4 transition hover:text-white/80 ${focusRing}`}

                  >

                    Baca artikel

                    <IconArrowUpRight size={14} />

                  </a>

                )}

              </p>

            </div>

          </motion.div>

          {/* KEAHLIAN */}

          <motion.div

            variants={rise}

            className="rounded-[2rem] border border-[#0f172a]/10 bg-white p-8 md:p-10 lg:col-span-3"

          >

            <p className="text-sm font-medium text-[#2563eb]">

              Keahlian

            </p>

            <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">

              {skillGroups.map((group) => (

                <div

                  key={group.title}

                  className="border-t border-[#0f172a]/10 pt-4"

                >

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

        {/* PENGALAMAN */}

        <div className="mt-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          <div className="lg:sticky lg:top-28 lg:self-start">

            <h3 className={h3Class}>

              Pengalaman

              <br />

              kerja

            </h3>

          </div>

          <ol className="space-y-12 border-l border-[#0f172a]/15 pl-8">

            {experiences.map((experience, index) => (

              <motion.li

                key={experience.role}

                variants={rise}

                initial="hidden"

                whileInView="visible"

                viewport={{

                  once: true,

                  amount: 0.3,

                }}

                className="relative"

              >

                <span

                  className={`absolute -left-[38.5px] top-2 h-3 w-3 rounded-full border-2 border-[#2563eb] ${

                    index === 0

                      ? 'bg-[#2563eb]'

                      : 'bg-[#f8faff]'

                  }`}

                />

                <p className="text-sm text-[#64748b]">

                  {experience.period}

                </p>

                <h4 className="mt-2 font-[Manrope] text-xl font-semibold tracking-tight md:text-2xl">

                  {experience.role}

                </h4>

                <p className="mt-1 text-sm font-medium text-[#2563eb]">

                  {experience.company}

                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#475569] md:text-base md:leading-8">

                  {experience.description}

                </p>

              </motion.li>

            ))}

          </ol>

        </div>

        {/* SERTIFIKASI */}

        <div className="mt-28">

          <h3 className={h3Class}>

            Sertifikasi &amp; pelatihan

          </h3>

          <div className="mt-10 grid gap-x-12 border-b border-[#0f172a]/10 sm:grid-cols-2">

            {certificates.map((certificate) => {

              const hasLink = Boolean(certificate.url)

              const Row = hasLink

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

                <Row

                  key={certificate.title}

                  {...linkProps}

                  variants={rise}

                  initial="hidden"

                  whileInView="visible"

                  viewport={{

                    once: true,

                    amount: 0.3,

                  }}

                  className={`group flex items-start justify-between gap-6 border-t border-[#0f172a]/10 py-6 ${focusRing}`}

                >

                  <div>

                    <h4 className="font-[Manrope] text-lg font-semibold leading-snug tracking-tight transition group-hover:text-[#2563eb]">

                      {certificate.title}

                    </h4>

                    <p className="mt-2 text-sm leading-6 text-[#64748b]">

                      {certificate.organization}{certificate.year ? ` · ${certificate.year}` : ''}

                    </p>

                  </div>

                  {hasLink && (

                    <span className="mt-1 shrink-0 text-[#64748b] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563eb]">

                      <IconArrowUpRight />

                      <span className="sr-only">

                        Lihat sertifikat

                      </span>

                    </span>

                  )}

                </Row>

              )

            })}

          </div>

        </div>

      </div>

    </section>

  )

}

function App() {

  const [projects, setProjects] = useState([])

  const [loadingProjects, setLoadingProjects] = useState(true)
  const [certificates, setCertificates] = useState([])

  const [activeProject, setActiveProject] = useState(0)

  const [direction, setDirection] = useState(1)

  const [adminUser, setAdminUser] = useState(() => {

    const savedUser = localStorage.getItem('admin_user')

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

  useEffect(() => {

    fetch(

      `${API_BASE_URL}/projects`

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

  useEffect(() => {
    let cancelled = false

    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/certificates`, {
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          throw new Error('Gagal mengambil data sertifikat.')
        }

        const data = await response.json()

        if (!cancelled) {
          setCertificates(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error sertifikat:', error)
      }
    }

    fetchCertificates()

    return () => {
      cancelled = true
    }
  }, [])

  const getImageUrl = (image) => {

    if (!image) {

      return ''

    }

    if (image.startsWith('http')) {

      return image

    }

    return `${API_BASE_URL}/storage/${image}`

  }

  const openProjectDetail = (projectId) => {

    window.location.href = `/projects/${projectId}`

  }

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

  if (isAdminPage && !adminUser) {

    return (

      <AdminLogin

        onLoginSuccess={setAdminUser}

      />

    )

  }

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

  if (isProjectDetailPage) {

    return (

      <ProjectDetail

        projectId={projectDetailId}

        onBack={() => {

          window.location.href = '/#projects'

        }}

      />

    )

  }

  return (

    <MotionConfig reducedMotion="user">

      <main className="min-h-screen bg-[#f8faff] text-[#0f172a]">

        <nav className="sticky top-0 z-50 border-b border-[#0f172a]/10 bg-[#f8faff]/85 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

            <a

              href="#home"

              className={`font-[Manrope] text-lg font-semibold tracking-tight ${focusRing}`}

            >

              SURYA

              <span className="text-[#2563eb]">

                .

              </span>

            </a>

            <div className="flex items-center gap-5 text-sm text-[#475569] md:gap-8">

              <a

                href="#about"

                className={`transition hover:text-[#0f172a] ${focusRing}`}

              >

                Tentang

              </a>

              <a

                href="#projects"

                className={`transition hover:text-[#0f172a] ${focusRing}`}

              >

                Projek

              </a>

              <a

                href="#contact"

                className={`rounded-full bg-[#0f172a] px-4 py-2 font-medium text-white transition hover:bg-[#2563eb] ${focusRing}`}

              >

                Hubungi saya

              </a>

            </div>

          </div>

        </nav>

        <section

          id="home"

          className="mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-16 md:px-10 lg:py-20"

        >

          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.65fr] lg:gap-16">

            {/* TEXT */}

            <div>

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

                className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#475569]"

              >

                <span className="inline-flex items-center gap-2 rounded-full border border-[#0f172a]/10 bg-white px-3.5 py-1.5">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

                  </span>

                  Terbuka untuk peluang kerja

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

                className="font-[Manrope] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl lg:text-[5.5rem]"

              >

                <span className="block font-normal text-[#64748b]">

                  Halo, saya

                </span>

                <span className="block">

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

                className="mt-10 max-w-2xl text-lg leading-8 text-[#334155] md:text-xl md:leading-9"

              >

                Fresh graduate S1 Teknik Informatika

                peminatan RPL yang bersemangat menjadi Full-Stack

                Developer. Untuk tugas akhir, saya membangun aplikasi

                Android dengan Kotlin dan backend PHP serta

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

                className="mt-12 flex flex-wrap items-center gap-3"

              >

                <a

                  href="#projects"

                  className={`rounded-full bg-[#2563eb] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] ${focusRing}`}

                >

                  Lihat projek

                </a>

                <a

                  href="#about"

                  className={`rounded-full border border-[#0f172a]/15 bg-white px-6 py-3 text-sm font-medium text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb] ${focusRing}`}

                >

                  Tentang saya

                </a>

              </motion.div>

            </div>

            {/* FOTO */}

            <motion.div

              initial={{

                opacity: 0,

                y: 24,

              }}

              animate={{

                opacity: 1,

                y: 0,

              }}

              transition={{

                duration: 0.8,

                delay: 0.3,

              }}

              className="flex justify-center lg:justify-end"

            >

              <div className="relative w-[230px] sm:w-[260px] md:w-[290px]">

                <img

                  src="/profile.jpeg"

                  alt="Ardiansyah Surya"

                  className="relative block aspect-[4/5] w-full rounded-[2rem] object-cover object-top"

                />

              </div>

            </motion.div>

          </div>

        </section>

        <About certificates={certificates} />

        <section

          id="projects"

          className="scroll-mt-16 border-t border-[#0f172a]/10"

        >

          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

            <motion.div

              variants={stagger}

              initial="hidden"

              whileInView="visible"

              viewport={{

                once: true,

                amount: 0.25,

              }}

              className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"

            >

              <motion.h2

                variants={rise}

                className={h2Class}

              >

                Projek yang telah saya bangun.

              </motion.h2>

              <motion.p

                variants={rise}

                className="text-base leading-8 text-[#475569] md:text-lg"

              >

                Website dan aplikasi yang saya kerjakan dari

                awal sampai akhir: analisis sistem,

                perancangan database, hingga pengujian. Geser

                untuk melihat projek lainnya.

              </motion.p>

            </motion.div>

            {loadingProjects ? (

              <div className="rounded-[2rem] border border-[#0f172a]/10 bg-white py-16 text-center text-sm text-[#64748b]">

                Memuat projek...

              </div>

            ) : projects.length > 0 ? (

              <div className="relative">

                {projects.length > 1 && (

                  <button

                    type="button"

                    onClick={goToPrevProject}

                    aria-label="Projek sebelumnya"

                    className={`absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] shadow-lg shadow-[#0f172a]/5 transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:flex ${focusRing}`}

                  >

                    <IconChevronLeft size={20} />

                  </button>

                )}

                {projects.length > 1 && (

                  <button

                    type="button"

                    onClick={goToNextProject}

                    aria-label="Projek berikutnya"

                    className={`absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] shadow-lg shadow-[#0f172a]/5 transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:flex ${focusRing}`}

                  >

                    <IconChevronRight size={20} />

                  </button>

                )}

                <div className="overflow-hidden rounded-[2rem]">

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

                          className="grid overflow-hidden rounded-[2rem] border border-[#0f172a]/10 bg-white md:min-h-[440px] md:grid-cols-[1.05fr_0.95fr]"

                        >

                          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#e8effd] sm:aspect-[16/10] md:h-[440px] md:aspect-auto">

                            {coverImage ? (

                              <img

                                src={getImageUrl(

                                  coverImage

                                )}

                                alt={project.title}

                                className="h-full w-full object-contain p-4 md:p-8"

                              />

                            ) : (

                              <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">

                                Gambar belum tersedia

                              </div>

                            )}

                            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#475569] shadow-sm backdrop-blur md:left-5 md:top-5 md:px-3 md:py-1.5 md:text-xs">

                              {String(

                                activeProject + 1

                              ).padStart(2, '0')}

                              {' / '}

                              {String(

                                projects.length

                              ).padStart(2, '0')}

                            </div>

                          </div>

                          <div className="flex flex-col justify-between p-6 md:p-10">

                            <div>

                              <div className="flex items-center justify-between gap-3 text-sm text-[#64748b]">

                                <span className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-3 py-1 text-xs text-[#475569]">

                                  {project.year || '—'}

                                </span>

                                {project.images?.length > 1 && (

                                  <span className="text-xs">

                                    {project.images.length}{' '}

                                    gambar projek

                                  </span>

                                )}

                              </div>

                              <h3 className="mt-6 font-[Manrope] text-2xl font-semibold leading-tight tracking-tight md:mt-8 md:text-3xl">

                                {project.title}

                              </h3>

                              <p className="mt-3 text-sm leading-7 text-[#475569] md:mt-4 md:text-base md:leading-8">

                                {project.description}

                              </p>

                              {project.technologies?.length > 0 && (

                                <div className="mt-5 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">

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

                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">

                              <button

                                type="button"

                                onClick={() =>

                                  openProjectDetail(

                                    project.id

                                  )

                                }

                                className={`rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1d4ed8] ${focusRing}`}

                              >

                                Lihat projek

                              </button>

                              {project.case_study && (

                                <a

                                  href={project.case_study}

                                  target="_blank"

                                  rel="noreferrer"

                                  className={`text-sm text-[#475569] underline decoration-[#0f172a]/20 underline-offset-4 transition hover:text-[#2563eb] hover:decoration-[#2563eb] ${focusRing}`}

                                >

                                  Studi kasus

                                </a>

                              )}

                              {project.github_url && (

                                <a

                                  href={project.github_url}

                                  target="_blank"

                                  rel="noreferrer"

                                  className={`text-sm text-[#475569] underline decoration-[#0f172a]/20 underline-offset-4 transition hover:text-[#2563eb] hover:decoration-[#2563eb] ${focusRing}`}

                                >

                                  GitHub

                                </a>

                              )}

                              {project.demo_url && (

                                <a

                                  href={project.demo_url}

                                  target="_blank"

                                  rel="noreferrer"

                                  className={`text-sm text-[#475569] underline decoration-[#0f172a]/20 underline-offset-4 transition hover:text-[#2563eb] hover:decoration-[#2563eb] ${focusRing}`}

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

                {projects.length > 1 && (

                  <div className="mt-6 flex items-center justify-center gap-6">

                    <button

                      type="button"

                      onClick={goToPrevProject}

                      aria-label="Projek sebelumnya"

                      className={`flex items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:hidden ${focusRing}`}

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

                            aria-label={`Ke projek ${index + 1}`}

                            className={`h-2 rounded-full transition-all ${focusRing} ${

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

                      aria-label="Projek berikutnya"

                      className={`flex items-center justify-center rounded-full border border-[#0f172a]/10 bg-white p-3 text-[#0f172a] transition hover:border-[#2563eb]/40 hover:text-[#2563eb] md:hidden ${focusRing}`}

                    >

                      <IconChevronRight size={18} />

                    </button>

                  </div>

                )}

              </div>

            ) : (

              <div className="rounded-[2rem] border border-[#0f172a]/10 bg-white py-16 text-center text-sm text-[#64748b]">

                Projek belum tersedia.

              </div>

            )}

          </div>

        </section>

        <section

          id="contact"

          className="scroll-mt-16 bg-[#0c1a3a] text-white"

        >

          <motion.div

            variants={stagger}

            initial="hidden"

            whileInView="visible"

            viewport={{

              once: true,

              amount: 0.25,

            }}

            className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"

          >

            <motion.h2

              variants={rise}

              className="max-w-4xl font-[Manrope] text-5xl font-semibold leading-[1] tracking-[-0.04em] md:text-7xl lg:text-8xl"

            >

              Punya ide atau

              <br />

              <span className="text-white/55">

                peluang kerja sama?

              </span>

            </motion.h2>

            <motion.p

              variants={rise}

              className="mt-8 max-w-xl text-base leading-8 text-white/70 md:text-lg"

            >

              Saya terbuka untuk peluang kerja, kolaborasi

              proyek, maupun sekadar berdiskusi. Hubungi saya

              lewat salah satu kanal di bawah ini.

            </motion.p>

            <motion.div

              variants={rise}

              className="mt-12"

            >

              <a

                href="mailto:spratama029@gmail.com"

                className={`inline-block break-all font-[Manrope] text-2xl font-medium tracking-tight transition hover:text-white/70 md:text-4xl ${focusRing}`}

              >

                spratama029@gmail.com

              </a>

            </motion.div>

            <motion.div

              variants={rise}

              className="mt-10 flex flex-wrap gap-3"

            >

              {socials.map((social) => (

                <a

                  key={social.label}

                  href={social.href}

                  target="_blank"

                  rel="noreferrer"

                  className={`inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white hover:bg-white hover:text-[#0c1a3a] ${focusRing}`}

                >

                  {social.label}

                  <IconArrowUpRight size={14} />

                </a>

              ))}

            </motion.div>

          </motion.div>

        </section>

      </main>

    </MotionConfig>

  )

}

export default App
