import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function ProjectDetail({ projectId, onBack }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)

  /* =========================================================
     GET PROJECT DETAIL
  ========================================================= */

  useEffect(() => {
    setLoading(true)
    setError('')
    setActiveImage(0)

    fetch(
      `https://api.portfoliosurya.my.id/api/projects/${projectId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Project tidak ditemukan.')
        }

        return response.json()
      })
      .then((data) => {
        setProject(data)
      })
      .catch((error) => {
        console.error(error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [projectId])

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

    return `https://api.portfoliosurya.my.id/api/storage/${image}`
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faff] text-[#0f172a]">
        <div className="flex items-center gap-3 text-sm text-[#64748b]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#2563eb]" />
          Memuat proyek...
        </div>
      </main>
    )
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faff] px-6 text-[#0f172a]">
        <div className="flex flex-col items-start">
          <p className="text-sm text-red-500">
            {error || 'Project tidak ditemukan.'}
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-sm text-[#475569] transition hover:text-[#2563eb]"
          >
            ← Kembali ke proyek
          </button>
        </div>
      </main>
    )
  }

  /* =========================================================
     IMAGES
  ========================================================= */

  const images =
    project.images?.length > 0
      ? project.images
      : project.image
        ? [{ image: project.image }]
        : []

  const currentImage = images[activeImage]

  return (
    <main className="min-h-screen bg-[#f8faff] text-[#0f172a]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-[#0f172a]/10 bg-[#f8faff]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">

          <button
            type="button"
            onClick={onBack}
            className="font-[Manrope] text-lg font-semibold tracking-tight transition hover:text-[#2563eb]"
          >
            SURYA
            <span className="text-[#2563eb]">
              .
            </span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="text-sm text-[#475569] transition hover:text-[#0f172a]"
          >
            ← Kembali
          </button>

        </div>
      </nav>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">

        {/* ===================================================
            TOP INFO
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="grid gap-10 border-b border-[#0f172a]/10 pb-16 md:grid-cols-[0.7fr_1.3fr]"
        >
          <div>
            <p className="text-sm text-[#2563eb]">
              Proyek
            </p>

            <span className="mt-4 inline-block rounded-full border border-[#0f172a]/10 bg-white px-3 py-1 text-xs text-[#475569]">
              {project.year || '—'}
            </span>
          </div>

          <div>
            <h1 className="font-[Manrope] text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#475569]">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* ===================================================
            GALLERY
        =================================================== */}

        {images.length > 0 && currentImage && (
          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="pt-16"
          >

            {/* MAIN IMAGE */}

            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-[#0f172a]/10 bg-white p-4 md:min-h-[520px] md:p-8">

              <img
                src={getImageUrl(currentImage.image)}
                alt={`${project.title} ${activeImage + 1}`}
                className="max-h-[70vh] max-w-full object-contain"
              />

              {/* IMAGE NUMBER */}

              <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs text-[#475569] shadow-sm backdrop-blur">
                {String(activeImage + 1).padStart(2, '0')} /{' '}
                {String(images.length).padStart(2, '0')}
              </div>

            </div>

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {images.length > 1 && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">

                {images.map((image, index) => (
                  <button
                    key={
                      image.id ||
                      `${image.image}-${index}`
                    }
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border bg-white p-2 transition ${
                      activeImage === index
                        ? 'border-[#2563eb] ring-2 ring-[#2563eb]/10'
                        : 'border-[#0f172a]/10 opacity-60 hover:border-[#2563eb]/40 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImageUrl(image.image)}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                    />

                    {activeImage === index && (
                      <div className="absolute bottom-2 left-2 rounded-full bg-[#2563eb] px-2 py-1 text-[10px] font-medium text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    )}
                  </button>
                ))}

              </div>
            )}

          </motion.section>
        )}

        {/* ===================================================
            DETAILS
        =================================================== */}

        <section className="mt-16 border-t border-[#0f172a]/10 pt-16">

          <div>

            {/* TECHNOLOGIES */}

            {project.technologies?.length > 0 && (
              <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-8 md:p-10">

                <p className="text-xs tracking-[0.15em] text-[#64748b]">
                  TEKNOLOGI
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[#0f172a]/10 bg-[#f1f5fd] px-3.5 py-1.5 text-sm text-[#334155]"
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>

              </div>
            )}

            {/* CASE STUDY */}

            {project.case_study && (
              <div className="mt-6 rounded-3xl border border-[#0f172a]/10 bg-white p-8 md:p-10">

                <p className="text-xs tracking-[0.15em] text-[#64748b]">
                  STUDI KASUS
                </p>

                <a
                  href={project.case_study}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2563eb] transition hover:text-[#1d4ed8]"
                >
                  Lihat studi kasus
                  <span>↗</span>
                </a>

              </div>
            )}

            {/* LINKS */}

            <div className="mt-6 flex flex-wrap gap-3">

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0f172a]/10 bg-white px-5 py-2.5 text-sm text-[#334155] transition hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  GitHub ↗
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1d4ed8]"
                >
                  Demo Langsung ↗
                </a>
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            BACK
        =================================================== */}

        <div className="mt-20 border-t border-[#0f172a]/10 pt-8">

          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-sm text-[#475569] transition hover:text-[#2563eb]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>

            Kembali ke semua proyek
          </button>

        </div>

      </div>

    </main>
  )
}

export default ProjectDetail