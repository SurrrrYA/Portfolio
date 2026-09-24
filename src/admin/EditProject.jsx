import { useEffect, useMemo, useState } from 'react'

function EditProject({ project, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    year: '',
    technologies: '',
    github_url: '',
    demo_url: '',
    case_study: '',
  })

  const [existingImages, setExistingImages] = useState([])
  const [removedExistingIds, setRemovedExistingIds] = useState([])
  const [newImages, setNewImages] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return ''
    }

    if (image.startsWith('http')) {
      return image
    }

    return `http://127.0.0.1:8000/storage/${image}`
  }

  // =========================================================
  // INITIAL DATA
  // =========================================================

  useEffect(() => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      year: project.year || '',
      technologies: project.technologies
        ? project.technologies.join(', ')
        : '',
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      case_study: project.case_study || '',
    })

    const initialImages =
      project.images?.length > 0
        ? [...project.images]
        : project.image
          ? [
              {
                id: null,
                image: project.image,
                legacy: true,
              },
            ]
          : []

    setExistingImages(initialImages)
    setRemovedExistingIds([])
    setNewImages([])
    setError('')
  }, [project])

  // =========================================================
  // NEW IMAGE PREVIEW
  // =========================================================

  const imagePreviews = useMemo(() => {
    return newImages.map((image) => ({
      file: image,
      preview: URL.createObjectURL(image),
    }))
  }, [newImages])

  useEffect(() => {
    return () => {
      imagePreviews.forEach((item) => {
        URL.revokeObjectURL(item.preview)
      })
    }
  }, [imagePreviews])

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // =========================================================
  // ADD NEW IMAGES
  // =========================================================

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    )

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    const maxSize = 5 * 1024 * 1024

    const validFiles = selectedFiles.filter((file) => {
      return (
        allowedTypes.includes(file.type) &&
        file.size <= maxSize
      )
    })

    if (validFiles.length !== selectedFiles.length) {
      setError(
        'Sebagian gambar tidak ditambahkan. Pastikan format JPG, PNG, atau WEBP dan ukuran maksimal 5 MB per gambar.'
      )
    } else {
      setError('')
    }

    setNewImages((current) => [
      ...current,
      ...validFiles,
    ])

    event.target.value = ''
  }

  // =========================================================
  // REMOVE NEW IMAGE
  // =========================================================

  const removeNewImage = (indexToRemove) => {
    setNewImages((current) =>
      current.filter(
        (_, index) => index !== indexToRemove
      )
    )
  }

  // =========================================================
  // MOVE NEW IMAGE UP
  // =========================================================

  const moveNewImageUp = (index) => {
    if (index === 0) return

    setNewImages((current) => {
      const updated = [...current]

      const temp = updated[index - 1]

      updated[index - 1] = updated[index]
      updated[index] = temp

      return updated
    })
  }

  // =========================================================
  // MOVE NEW IMAGE DOWN
  // =========================================================

  const moveNewImageDown = (index) => {
    setNewImages((current) => {
      if (index === current.length - 1) {
        return current
      }

      const updated = [...current]

      const temp = updated[index + 1]

      updated[index + 1] = updated[index]
      updated[index] = temp

      return updated
    })
  }

  // =========================================================
  // REMOVE EXISTING IMAGE
  // =========================================================

  const removeExistingImage = (image) => {
    if (!image.id) {
      setError(
        'Gambar lama ini belum memiliki data project_images, jadi belum bisa dihapus dari sistem melalui editor ini.'
      )
      return
    }

    setRemovedExistingIds((current) => {
      if (current.includes(image.id)) {
        return current
      }

      return [...current, image.id]
    })

    setExistingImages((current) =>
      current.filter(
        (item) => item.id !== image.id
      )
    )

    setError('')
  }

  // =========================================================
  // MOVE EXISTING IMAGE UP
  // =========================================================

  const moveExistingImageUp = (index) => {
    if (index === 0) return

    setExistingImages((current) => {
      const updated = [...current]

      const temp = updated[index - 1]

      updated[index - 1] = updated[index]
      updated[index] = temp

      return updated
    })
  }

  // =========================================================
  // MOVE EXISTING IMAGE DOWN
  // =========================================================

  const moveExistingImageDown = (index) => {
    setExistingImages((current) => {
      if (index === current.length - 1) {
        return current
      }

      const updated = [...current]

      const temp = updated[index + 1]

      updated[index + 1] = updated[index]
      updated[index] = temp

      return updated
    })
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem(
        'admin_token'
      )

      if (!token) {
        throw new Error(
          'Token admin tidak ditemukan. Silakan login kembali.'
        )
      }

      const formData = new FormData()

      formData.append('_method', 'PUT')

      formData.append(
        'title',
        form.title
      )

      formData.append(
        'description',
        form.description
      )

      formData.append(
        'year',
        form.year || ''
      )

      const technologies = form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

      formData.append(
        'technologies',
        JSON.stringify(technologies)
      )

      formData.append(
        'github_url',
        form.github_url || ''
      )

      formData.append(
        'demo_url',
        form.demo_url || ''
      )

      formData.append(
        'case_study',
        form.case_study || ''
      )

      // =====================================================
      // ID GAMBAR YANG DIHAPUS
      // =====================================================

      formData.append(
        'removed_images',
        JSON.stringify(removedExistingIds)
      )

      // =====================================================
      // URUTAN GAMBAR LAMA
      // =====================================================

      const imageOrder = existingImages
        .filter((image) => image.id)
        .map((image) => image.id)

      formData.append(
        'image_order',
        JSON.stringify(imageOrder)
      )

      // =====================================================
      // GAMBAR BARU
      // =====================================================

      newImages.forEach((image) => {
        formData.append(
          'images[]',
          image
        )
      })

      const response = await fetch(
        `http://127.0.0.1:8000/api/projects/${project.id}`,
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
          data.message ||
            'Gagal memperbarui project.'
        )
      }

      onSuccess(data.data)
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          'Terjadi kesalahan saat memperbarui project.'
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================================================
  // TOTAL IMAGES
  // =========================================================

  const totalImages =
    existingImages.length + newImages.length

  return (
    <div className="rounded-3xl border border-[#2563eb]/30 bg-white p-5 sm:p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8 flex items-start justify-between gap-5">

        <div className="min-w-0">

          <p className="text-sm text-[#2563eb]">
            Edit Proyek
          </p>

          <h2 className="mt-2 break-words font-[Manrope] text-2xl text-[#0f172a]">
            {project.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            Perbarui informasi, hapus, atau atur posisi gambar project.
          </p>

        </div>

        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 text-sm text-[#475569] transition hover:text-[#0f172a]"
        >
          Batal
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ===================================================
            TITLE
        =================================================== */}

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
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />

        </div>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

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
            className="w-full resize-none rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />

        </div>

        {/* ===================================================
            YEAR
        =================================================== */}

        <div>

          <label className="mb-2 block text-sm text-[#334155]">
            Tahun
          </label>

          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            min="2000"
            max="2100"
            className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#2563eb]"
          />

        </div>

        {/* ===================================================
            TECHNOLOGIES
        =================================================== */}

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

        {/* ===================================================
            GITHUB
        =================================================== */}

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

        {/* ===================================================
            DEMO
        =================================================== */}

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

        {/* ===================================================
            CASE STUDY
        =================================================== */}

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

        {/* ===================================================
            EXISTING IMAGES
        =================================================== */}

        <div>

          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <label className="block text-sm text-[#334155]">
              Gambar Saat Ini
            </label>

            <span className="text-xs text-[#64748b]">
              {totalImages} gambar
            </span>

          </div>

          <p className="mb-4 text-xs leading-5 text-[#64748b]">
            Gunakan tombol ↑ ↓ untuk mengubah urutan. Gambar pertama menjadi cover.
          </p>

          {existingImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {existingImages.map(
                (image, index) => (
                  <div
                    key={
                      image.id ||
                      `${image.image}-${index}`
                    }
                    className="overflow-hidden rounded-2xl border border-[#0f172a]/10 bg-[#eef2f7]"
                  >

                    {/* IMAGE */}

                    <div className="flex min-h-[220px] items-center justify-center p-3">

                      <img
                        src={getImageUrl(
                          image.image
                        )}
                        alt={`${project.title} ${index + 1}`}
                        className="max-h-[300px] max-w-full object-contain"
                      />

                    </div>

                    {/* INFO */}

                    <div className="border-t border-[#0f172a]/10 bg-white p-3">

                      <div className="mb-3 flex items-center justify-between gap-3">

                        <p className="text-xs font-medium text-[#475569]">
                          Gambar {index + 1}
                        </p>

                        {index === 0 && (
                          <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[10px] font-medium text-white">
                            COVER
                          </span>
                        )}

                      </div>

                      <div className="flex items-center gap-2">

                        {/* UP */}

                        <button
                          type="button"
                          onClick={() =>
                            moveExistingImageUp(
                              index
                            )
                          }
                          disabled={index === 0}
                          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#0f172a]/10 text-sm text-[#475569] transition hover:border-[#2563eb]/30 hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
                          title="Pindah ke kiri/atas"
                        >
                          ↑
                        </button>

                        {/* DOWN */}

                        <button
                          type="button"
                          onClick={() =>
                            moveExistingImageDown(
                              index
                            )
                          }
                          disabled={
                            index ===
                            existingImages.length -
                              1
                          }
                          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#0f172a]/10 text-sm text-[#475569] transition hover:border-[#2563eb]/30 hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
                          title="Pindah ke kanan/bawah"
                        >
                          ↓
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeExistingImage(
                              image
                            )
                          }
                          disabled={!image.id}
                          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-red-500/15 text-sm text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                          title="Hapus gambar"
                        >
                          Hapus
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#0f172a]/15 bg-[#f8faff] px-6 py-10 text-center text-sm text-[#64748b]">
              Tidak ada gambar lama.
            </div>
          )}

        </div>

        {/* ===================================================
            ADD NEW IMAGES
        =================================================== */}

        <div>

          <label className="mb-3 block text-sm text-[#334155]">
            Tambah Gambar Baru
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#0f172a]/15 bg-[#f8faff] px-6 py-10 transition hover:border-[#2563eb]">

            <span className="text-sm font-medium text-[#334155]">
              + Tambah Gambar
            </span>

            <span className="mt-2 text-center text-xs text-[#64748b]">
              Web maupun screenshot Android bisa ditambahkan
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
            Maksimal 5 MB per gambar. Gambar baru akan ditambahkan setelah gambar lama.
          </p>

          {/* NEW PREVIEW */}

          {newImages.length > 0 && (
            <div className="mt-5">

              <p className="mb-3 text-xs text-[#64748b]">
                Gambar baru
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {imagePreviews.map(
                  (item, index) => (
                    <div
                      key={`${item.file.name}-${item.file.lastModified}-${index}`}
                      className="overflow-hidden rounded-2xl border border-[#0f172a]/10 bg-[#eef2f7]"
                    >

                      {/* PREVIEW */}

                      <div className="flex min-h-[220px] items-center justify-center p-3">

                        <img
                          src={item.preview}
                          alt={`Gambar baru ${index + 1}`}
                          className="max-h-[300px] max-w-full object-contain"
                        />

                      </div>

                      {/* INFO */}

                      <div className="border-t border-[#0f172a]/10 bg-white p-3">

                        <p className="mb-3 truncate text-xs text-[#475569]">
                          {item.file.name}
                        </p>

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              moveNewImageUp(
                                index
                              )
                            }
                            disabled={index === 0}
                            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#0f172a]/10 text-sm text-[#475569] transition hover:border-[#2563eb]/30 hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            ↑
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              moveNewImageDown(
                                index
                              )
                            }
                            disabled={
                              index ===
                              newImages.length - 1
                            }
                            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#0f172a]/10 text-sm text-[#475569] transition hover:border-[#2563eb]/30 hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            ↓
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeNewImage(
                                index
                              )
                            }
                            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-red-500/15 text-sm text-red-500 transition hover:bg-red-50"
                          >
                            Hapus
                          </button>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
            {error}
          </div>
        )}

        {/* ===================================================
            BUTTON
        =================================================== */}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">

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
            {loading
              ? 'Menyimpan...'
              : 'Simpan Perubahan'}
          </button>

        </div>

      </form>
    </div>
  )
}

export default EditProject