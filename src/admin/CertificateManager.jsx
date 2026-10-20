import { useCallback, useEffect, useState } from 'react'

const API_BASE_URL = 'https://api.portfoliosurya.my.id/api'

const EMPTY_FORM = {
  title: '',
  organization: '',
  year: '',
  url: '',
  sort_order: '0',
}

function getErrorMessage(data, fallback) {
  if (data?.errors) {
    const validationMessages = Object.values(data.errors).flat()
    if (validationMessages.length) return validationMessages.join(' ')
  }

  return data?.message || fallback
}

export default function CertificateManager() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_BASE_URL}/certificates`, {
        headers: { Accept: 'application/json' },
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, 'Gagal mengambil data sertifikat.')
        )
      }

      setCertificates(Array.isArray(data) ? data : [])
    } catch (requestError) {
      console.error('Fetch certificates error:', requestError)
      setError(requestError.message || 'Gagal mengambil data sertifikat.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCertificates()
  }, [fetchCertificates])

  const openCreateForm = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM })
    setFormOpen(true)
    setError('')
    setSuccess('')
  }

  const openEditForm = (certificate) => {
    setEditingId(certificate.id)
    setForm({
      title: certificate.title || '',
      organization: certificate.organization || '',
      year: certificate.year ?? '',
      url: certificate.url || '',
      sort_order: String(certificate.sort_order ?? 0),
    })
    setFormOpen(true)
    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingId(null)
    setForm({ ...EMPTY_FORM })
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    const token = localStorage.getItem('admin_token')
    if (!token) {
      setError('Sesi admin tidak ditemukan. Silakan login ulang.')
      setSaving(false)
      return
    }

    const payload = {
      title: form.title.trim(),
      organization: form.organization.trim(),
      year: form.year === '' ? null : Number(form.year),
      url: form.url.trim() || null,
      sort_order: form.sort_order === '' ? 0 : Number(form.sort_order),
    }

    try {
      const response = await fetch(
        editingId
          ? `${API_BASE_URL}/certificates/${editingId}`
          : `${API_BASE_URL}/certificates`,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, 'Sertifikat gagal disimpan.')
        )
      }

      setSuccess(data?.message || 'Sertifikat berhasil disimpan.')
      closeForm()
      await fetchCertificates()
    } catch (requestError) {
      console.error('Save certificate error:', requestError)
      setError(requestError.message || 'Sertifikat gagal disimpan.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (certificate) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus sertifikat "${certificate.title}"?`
    )
    if (!confirmed) return

    const token = localStorage.getItem('admin_token')
    if (!token) {
      setError('Sesi admin tidak ditemukan. Silakan login ulang.')
      return
    }

    setDeletingId(certificate.id)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(
        `${API_BASE_URL}/certificates/${certificate.id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, 'Sertifikat gagal dihapus.')
        )
      }

      setCertificates((current) =>
        current.filter((item) => item.id !== certificate.id)
      )
      setSuccess(data?.message || 'Sertifikat berhasil dihapus.')
      if (editingId === certificate.id) closeForm()
    } catch (requestError) {
      console.error('Delete certificate error:', requestError)
      setError(requestError.message || 'Sertifikat gagal dihapus.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm text-[#2563eb]">Konten</p>
          <h2 className="font-[Manrope] text-3xl tracking-tight sm:text-4xl">
            Sertifikasi &amp; Pelatihan
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#475569] sm:text-base">
            Tambahkan, edit, atau hapus sertifikat yang tampil di portofolio.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="w-full rounded-full bg-[#2563eb] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] sm:w-auto"
        >
          + Tambah Sertifikat
        </button>
      </div>

      {error && (
        <div role="alert" className="mb-5 rounded-2xl border border-red-500/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div role="status" className="mb-5 rounded-2xl border border-green-500/20 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
          {success}
        </div>
      )}

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-3xl border border-[#0f172a]/10 bg-white p-5 sm:p-7"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-[Manrope] text-xl">
                {editingId ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
              </h3>
              <p className="mt-2 text-sm text-[#64748b]">
                Isi informasi sertifikat atau pelatihan di bawah.
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm text-[#64748b] transition hover:text-[#2563eb]"
            >
              Batal
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="certificate-title" className="mb-2 block text-sm text-[#334155]">
                Nama sertifikat <span className="text-red-600">*</span>
              </label>
              <input
                id="certificate-title"
                name="title"
                value={form.title}
                onChange={handleFieldChange}
                required
                maxLength={255}
                placeholder="Contoh: Pemrogram / Programmer"
                className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm outline-none transition focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label htmlFor="certificate-organization" className="mb-2 block text-sm text-[#334155]">
                Penyelenggara <span className="text-red-600">*</span>
              </label>
              <input
                id="certificate-organization"
                name="organization"
                value={form.organization}
                onChange={handleFieldChange}
                required
                maxLength={255}
                placeholder="Nama lembaga atau penyelenggara"
                className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm outline-none transition focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label htmlFor="certificate-year" className="mb-2 block text-sm text-[#334155]">
                Tahun
              </label>
              <input
                id="certificate-year"
                name="year"
                type="number"
                min="1900"
                max="2100"
                value={form.year}
                onChange={handleFieldChange}
                placeholder="Contoh: 2026"
                className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm outline-none transition focus:border-[#2563eb]"
              />
            </div>

            <div>
              <label htmlFor="certificate-sort-order" className="mb-2 block text-sm text-[#334155]">
                Urutan tampilan
              </label>
              <input
                id="certificate-sort-order"
                name="sort_order"
                type="number"
                min="0"
                value={form.sort_order}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm outline-none transition focus:border-[#2563eb]"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="certificate-url" className="mb-2 block text-sm text-[#334155]">
                Link sertifikat (opsional)
              </label>
              <input
                id="certificate-url"
                name="url"
                type="url"
                value={form.url}
                onChange={handleFieldChange}
                maxLength={2048}
                placeholder="https://..."
                className="w-full rounded-xl border border-[#0f172a]/10 bg-[#f8faff] px-4 py-3 text-sm outline-none transition focus:border-[#2563eb]"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#2563eb] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Simpan Sertifikat'}
            </button>
            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="rounded-full border border-[#0f172a]/10 bg-white px-6 py-3 text-sm text-[#475569] transition hover:border-[#2563eb]/40 hover:text-[#2563eb]"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="rounded-3xl border border-[#0f172a]/10 bg-white px-5 py-10 text-sm text-[#64748b]">
          Memuat sertifikat...
        </div>
      ) : certificates.length === 0 ? (
        <div className="rounded-3xl border border-[#0f172a]/10 bg-white px-5 py-10 text-sm text-[#64748b]">
          Belum ada sertifikat. Klik “Tambah Sertifikat” untuk memulai.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[#0f172a]/10 bg-white">
          {certificates.map((certificate, index) => (
            <article
              key={certificate.id}
              className="border-b border-[#0f172a]/10 px-4 py-5 last:border-b-0 sm:px-6 sm:py-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-[#64748b]">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {certificate.year && <span>{certificate.year}</span>}
                  </div>
                  <h3 className="break-words font-[Manrope] text-lg sm:text-xl">
                    {certificate.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#64748b]">
                    {certificate.organization}
                  </p>
                  {certificate.url && (
                    <a
                      href={certificate.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block break-all text-sm text-[#2563eb] hover:underline"
                    >
                      Buka sertifikat ↗
                    </a>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-5 border-t border-[#0f172a]/10 pt-4 sm:border-t-0 sm:pt-1">
                  <button
                    type="button"
                    onClick={() => openEditForm(certificate)}
                    className="text-sm text-[#475569] transition hover:text-[#2563eb]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(certificate)}
                    disabled={deletingId === certificate.id}
                    className="text-sm text-[#64748b] transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === certificate.id ? 'Menghapus...' : 'Hapus'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
