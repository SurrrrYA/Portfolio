<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'title' => 'Pemrogram / Programmer',
                'organization' => 'Badan Nasional Sertifikasi Profesi',
                'year' => 2026,
                'url' => 'https://drive.google.com/file/d/1hn42fhy-6bw-_ddwlT2BppOIkcpXnaK1/view?usp=drive_link',
                'sort_order' => 1,
            ],
            [
                'title' => 'English Proficiency Certificate',
                'organization' => 'LDC Universitas Muhammadiyah Purwokerto',
                'year' => 2024,
                'url' => 'https://drive.google.com/file/d/1FEZNbEDS_EA6Su2X8qwrihZKGdzMvu9o/view?usp=sharing',
                'sort_order' => 2,
            ],
            [
                'title' => 'Digital Skill Fair 12.0',
                'organization' => 'Dibimbing.id',
                'year' => 2022,
                'url' => 'https://drive.google.com/file/d/1ZVSH6ZjwPO88ZeUSqJcSMJZOHBPhVo7d/view?usp=drive_link',
                'sort_order' => 3,
            ],
            [
                'title' => 'Design & Content Development (DECODE)',
                'organization' => 'BEM Fakultas Ilmu Kesehatan',
                'year' => 2025,
                'url' => 'https://drive.google.com/file/d/1AwGgsEcplu-xczIDnupuEX47VoA64dyo/view?usp=drive_link',
                'sort_order' => 4,
            ],
            [
                'title' => 'Informatics Guest Lecture — Exploring AI',
                'organization' => 'Prodi Informatika UMP',
                'year' => 2026,
                'url' => 'https://drive.google.com/file/d/1M0vfnA48a35r3o4dK8tvxTtAvWmcW_f8/view?usp=drive_link',
                'sort_order' => 5,
            ],
            [
                'title' => 'Baitrul Arqam',
                'organization' => 'Career Competencies & Soft Skills',
                'year' => null,
                'url' => 'https://drive.google.com/file/d/14-FmR6cLfMz4skhj20Th6Xkas_PsUr9m/view?usp=drive_link',
                'sort_order' => 6,
            ],
        ];

        foreach ($certificates as $certificate) {
            Certificate::updateOrCreate(
                [
                    'title' => $certificate['title'],
                ],
                $certificate
            );
        }
    }
}