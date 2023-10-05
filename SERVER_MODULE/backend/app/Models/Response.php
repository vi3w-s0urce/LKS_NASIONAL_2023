<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;
    protected $fillable = [
        'form_id',
        'user_id',
        'date',
    ];

    public function answer() {
        return $this->hasMany(Answer::class);
    }
}
