<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Menampilkan semua project.
     */
    public function index()
    {
        $projects = Project::with('images')
            ->latest()
            ->get();

        return response()->json($projects);
    }

    /**
     * Menyimpan project baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'year' => 'nullable|integer',

            'technologies' => 'nullable|string',

            'github_url' => 'nullable|string|max:255',
            'demo_url' => 'nullable|string|max:255',
            'case_study' => 'nullable|string',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $technologies = !empty($validated['technologies'])
            ? json_decode($validated['technologies'], true)
            : [];

        if (!is_array($technologies)) {
            $technologies = [];
        }

        $project = Project::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'year' => $validated['year'] ?? null,
            'image' => null,
            'technologies' => $technologies,
            'github_url' => $validated['github_url'] ?? null,
            'demo_url' => $validated['demo_url'] ?? null,
            'case_study' => $validated['case_study'] ?? null,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Upload Multiple Images
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('projects', 'public');

                $project->images()->create([
                    'image' => $path,
                    'sort_order' => $index,
                ]);

                // Gambar pertama menjadi cover
                if ($index === 0) {
                    $project->update([
                        'image' => $path,
                    ]);
                }
            }
        }

        return response()->json([
            'message' => 'Project berhasil ditambahkan.',
            'data' => $project->load('images'),
        ], 201);
    }

    /**
     * Menampilkan satu project.
     */
    public function show(string $id)
    {
        $project = Project::with('images')
            ->findOrFail($id);

        return response()->json($project);
    }

    /**
     * Mengubah project.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::with('images')
            ->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'year' => 'nullable|integer',

            'technologies' => 'nullable|string',

            'github_url' => 'nullable|string|max:255',
            'demo_url' => 'nullable|string|max:255',
            'case_study' => 'nullable|string',

            'removed_images' => 'nullable|string',
            'image_order' => 'nullable|string',

            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Technologies
        |--------------------------------------------------------------------------
        */

        $technologies = array_key_exists(
            'technologies',
            $validated
        )
            ? json_decode(
                $validated['technologies'],
                true
            )
            : $project->technologies;

        if (!is_array($technologies)) {
            $technologies = [];
        }

        /*
        |--------------------------------------------------------------------------
        | Update Data Project
        |--------------------------------------------------------------------------
        */

        $project->update([
            'title' => $validated['title']
                ?? $project->title,

            'description' => $validated['description']
                ?? $project->description,

            'year' => array_key_exists(
                'year',
                $validated
            )
                ? $validated['year']
                : $project->year,

            'technologies' => $technologies,

            'github_url' => array_key_exists(
                'github_url',
                $validated
            )
                ? $validated['github_url']
                : $project->github_url,

            'demo_url' => array_key_exists(
                'demo_url',
                $validated
            )
                ? $validated['demo_url']
                : $project->demo_url,

            'case_study' => array_key_exists(
                'case_study',
                $validated
            )
                ? $validated['case_study']
                : $project->case_study,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Hapus Gambar Lama
        |--------------------------------------------------------------------------
        */

        $removedImages = [];

        if (!empty($validated['removed_images'])) {
            $removedImages = json_decode(
                $validated['removed_images'],
                true
            );

            if (!is_array($removedImages)) {
                $removedImages = [];
            }
        }

        $removedImages = collect($removedImages)
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        if (!empty($removedImages)) {
            $imagesToDelete = $project->images()
                ->whereIn('id', $removedImages)
                ->get();

            foreach ($imagesToDelete as $image) {
                if (
                    $image->image &&
                    Storage::disk('public')->exists(
                        $image->image
                    )
                ) {
                    Storage::disk('public')->delete(
                        $image->image
                    );
                }

                $image->delete();
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Atur Urutan Gambar Lama
        |--------------------------------------------------------------------------
        */

        $imageOrder = [];

        if (!empty($validated['image_order'])) {
            $imageOrder = json_decode(
                $validated['image_order'],
                true
            );

            if (!is_array($imageOrder)) {
                $imageOrder = [];
            }
        }

        $imageOrder = collect($imageOrder)
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        /*
        |--------------------------------------------------------------------------
        | Ambil Gambar Yang Masih Ada
        |--------------------------------------------------------------------------
        */

        $currentImages = $project->images()
            ->orderBy('sort_order')
            ->get();

        $currentImageIds = $currentImages
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->all();

        /*
        |--------------------------------------------------------------------------
        | Susun ID Sesuai Urutan Dari Frontend
        |--------------------------------------------------------------------------
        */

        $orderedIds = [];

        foreach ($imageOrder as $imageId) {
            if (
                in_array(
                    $imageId,
                    $currentImageIds,
                    true
                ) &&
                !in_array(
                    $imageId,
                    $orderedIds,
                    true
                )
            ) {
                $orderedIds[] = $imageId;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Masukkan Gambar Yang Tidak Ada Di image_order
        | ke bagian paling belakang
        |--------------------------------------------------------------------------
        */

        foreach ($currentImageIds as $imageId) {
            if (
                !in_array(
                    $imageId,
                    $orderedIds,
                    true
                )
            ) {
                $orderedIds[] = $imageId;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Simpan Sort Order
        |--------------------------------------------------------------------------
        */

        foreach (
            $orderedIds as $sortOrder => $imageId
        ) {
            $project->images()
                ->where('id', $imageId)
                ->update([
                    'sort_order' => $sortOrder,
                ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Tambahkan Gambar Baru
        |--------------------------------------------------------------------------
        */

        $lastSortOrder = $project->images()
            ->max('sort_order');

        $lastSortOrder = $lastSortOrder === null
            ? -1
            : (int) $lastSortOrder;

        if ($request->hasFile('images')) {
            foreach (
                $request->file('images') as $index => $image
            ) {
                $path = $image->store(
                    'projects',
                    'public'
                );

                $project->images()->create([
                    'image' => $path,
                    'sort_order' => $lastSortOrder + $index + 1,
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Update Cover
        |--------------------------------------------------------------------------
        */

        $firstImage = $project->images()
            ->orderBy('sort_order')
            ->first();

        $project->update([
            'image' => $firstImage?->image,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Project berhasil diperbarui.',
            'data' => $project
                ->fresh()
                ->load('images'),
        ]);
    }

    /**
     * Menghapus project.
     */
    public function destroy(string $id)
    {
        $project = Project::with('images')
            ->findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Hapus semua file gambar dari storage
        |--------------------------------------------------------------------------
        */

        foreach ($project->images as $image) {
            if (
                Storage::disk('public')->exists(
                    $image->image
                )
            ) {
                Storage::disk('public')->delete(
                    $image->image
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Hapus project
        |--------------------------------------------------------------------------
        */

        $project->delete();

        return response()->json([
            'message' => 'Project berhasil dihapus.',
        ]);
    }
}