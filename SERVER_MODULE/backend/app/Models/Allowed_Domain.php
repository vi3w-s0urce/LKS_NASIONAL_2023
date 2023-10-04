<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allowed_Domain extends Model
{
    use HasFactory;
    protected $fillable = [
        'form_id',
        'domain',
    ];
}
