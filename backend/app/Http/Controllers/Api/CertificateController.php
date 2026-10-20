<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Menampilkan semua sertifikat.
     */
    public function index()
    {
        $certificates = Certificate::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return response()->json($certificates);
    }

    /**
     * Menyimpan sertifikat baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'year' => 'nullable|integer|min:1900|max:2100',
            'url' => 'nullable|url|max:2048',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $certificate = Certificate::create($validated);

        return response()->json([
            'message' => 'Sertifikat berhasil ditambahkan.',
            'data' => $certificate,
        ], 201);
    }

    /**
     * Menampilkan satu sertifikat.
     */
    public function show(string $id)
    {
        $certificate = Certificate::findOrFail($id);

        return response()->json($certificate);
    }

    /**
     * Memperbarui sertifikat.
     */
    public function update(Request $request, string $id)
    {
        $certificate = Certificate::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'organization' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|nullable|integer|min:1900|max:2100',
            'url' => 'sometimes|nullable|url|max:2048',
            'sort_order' => 'sometimes|integer|min:0',
        ]);

        $certificate->update($validated);

        return response()->json([
            'message' => 'Sertifikat berhasil diperbarui.',
            'data' => $certificate->fresh(),
        ]);
    }

    /**
     * Menghapus sertifikat.
     */
    public function destroy(string $id)
    {
        $certificate = Certificate::findOrFail($id);

        $certificate->delete();

        return response()->json([
            'message' => 'Sertifikat berhasil dihapus.',
        ]);
    }
}