import { useEffect, useMemo, useState } from 'react'

function AddProject({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    year: '',
    technologies: '',
    github_url: '',
    demo_url: '',
    case_study: '',
  })

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || [])

    const validFiles = selectedFiles.filter((file) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
      ]

      const maxSize = 5 * 1024 * 1024

      return (
        allowedTypes.includes(file.type) &&
        file.size <= maxSize
      )
    })

    setImages((current) => [...current, ...validFiles])

    event.target.value = ''
  }

  const removeImage = (indexToRemove) => {
    setImages((current) =>
      current.filter((_, index) => index !== indexToRemove)
    )
  }

  const imagePreviews = useMemo(() => {
    return images.map((image) => ({
      file: image,
      preview: URL.createObjectURL(image),
    }))
  }, [images])

  useEffect(() => {
    return () => {
      imagePreviews.forEach((item) => {
        URL.revokeObjectURL(item.preview)
      })
    }
  }, [imagePreviews])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('admin_token')

      if (!token) {
        throw new Error(
          'Token admin tidak ditemukan. Silakan login kembali.'
        )
      }

      const formData = new FormData()

      formData.append('title', form.title)
      formData.append('description', form.description)

      if (form.year) {
        formData.append('year', form.year)
      }

      const technologies = form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

      formData.append(
        'technologies',
        JSON.stringify(technologies)
      )

      if (form.github_url) {
        formData.append('github_url', form.github_url)
      }

      if (form.demo_url) {
        formData.append('demo_url', form.demo_url)
      }

      if (form.case_study) {
        formData.append('case_study', form.case_study)
      }

      images.forEach((image) => {
        formData.append('images[]', image)
      })

      const response = await fetch(
        'https://api.portfoliosurya.my.id/api/projects',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Gagal menambahkan project.'
        )
      }

      onSuccess(data.data)
    } catch (error) {
      console.error(error)
      setError(
        error.message || 'Terjadi kesalahan saat menyimpan project.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-[#0f172a]/10 bg-white p-6 md:p-8">
      {/* HEADER */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <p className="text-sm text-[#2563eb]">
            PROYEK BARU
          </p>

          <h2 className="mt-2 font-[Manrope] text-2xl font-semibold text-[#0f172a]">
            Tambah Proyek
          </h2>

          <p className="mt-2 text-sm text-[#64748b]">
            Tambahkan project baru ke portofolio.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-[#475569] transition hover:text-[#0f172a]"
        >
          Batal
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            Judul
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Contoh: Motorcycle Workshop Management"
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            Deskripsi
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Jelaskan project secara singkat..."
            className="w-full resize-none rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* YEAR */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            Tahun
          </label>

          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2026"
            min="2000"
            max="2100"
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* TECHNOLOGIES */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            Teknologi
          </label>

          <input
            type="text"
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Laravel, MySQL"
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />

          <p className="mt-2 text-xs text-[#64748b]">
            Pisahkan teknologi dengan koma.
          </p>
        </div>

        {/* GITHUB */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            URL GitHub
          </label>

          <input
            type="url"
            name="github_url"
            value={form.github_url}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* DEMO */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            URL Demo
          </label>

          <input
            type="url"
            name="demo_url"
            value={form.demo_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* CASE STUDY */}
        <div>
          <label className="mb-2 block text-sm text-[#334155]">
            URL Studi Kasus
          </label>

          <input
            type="url"
            name="case_study"
            value={form.case_study}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />
        </div>

        {/* PROJECT IMAGES */}
        <div>
          <label className="mb-3 block text-sm text-[#334155]">
            Gambar Proyek
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#0f172a]/15 bg-[#f8faff] px-6 py-10 transition hover:border-[#2563eb]">
            <span className="text-sm font-medium text-[#334155]">
              + Tambah Gambar
            </span>

            <span className="mt-2 text-xs text-[#64748b]">
              Bisa memilih beberapa gambar sekaligus
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <p className="mt-2 text-xs leading-5 text-[#64748b]">
            Maksimal 5 MB per gambar. Gambar pertama akan
            menjadi cover project.
          </p>

          <p className="mt-1 text-xs leading-5 text-[#64748b]">
            Bisa menggunakan screenshot website maupun
            screenshot aplikasi Android.
          </p>

          {/* IMAGE PREVIEW */}
          {images.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {imagePreviews.map((item, index) => (
                <div
                  key={`${item.file.name}-${item.file.lastModified}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-[#0f172a]/10 bg-[#eef2f7]"
                >
                  {/* IMAGE AREA */}
                  <div className="flex min-h-[220px] items-center justify-center bg-[#eef2f7] p-3">
                    <img
                      src={item.preview}
                      alt={`Preview ${index + 1}`}
                      className="max-h-[360px] max-w-full object-contain"
                    />
                  </div>

                  {/* COVER BADGE */}
                  {index === 0 && (
                    <div className="absolute left-3 top-3 rounded-full bg-[#2563eb] px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                      COVER
                    </div>
                  )}

                  {/* REMOVE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-sm text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                    aria-label={`Hapus gambar ${index + 1}`}
                  >
                    ×
                  </button>

                  {/* FILE NAME */}
                  <div className="border-t border-[#0f172a]/10 bg-white px-3 py-3">
                    <p className="truncate text-xs text-[#475569]">
                      {item.file.name}
                    </p>

                    <p className="mt-1 text-[11px] text-[#94a3b8]">
                      Gambar {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* BUTTON */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full border border-[#0f172a]/10 px-5 py-3 text-sm text-[#475569] transition hover:bg-[#f1f5fd] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#2563eb] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Proyek'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProject