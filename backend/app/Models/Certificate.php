<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'organization',
        'year',
        'url',
        'sort_order',
    ];

    protected $casts = [
        'year' => 'integer',
        'sort_order' => 'integer',
    ];
}