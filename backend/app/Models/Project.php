<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'year',
        'image',
        'technologies',
        'github_url',
        'demo_url',
        'case_study',
    ];

    protected $casts = [
        'technologies' => 'array',
        'year' => 'integer',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)
            ->orderBy('sort_order');
    }
}