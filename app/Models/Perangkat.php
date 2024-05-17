<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perangkat extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function data()
    {
        return $this->hasMany(Data::class);
        // return $this->hasMany(Data::class)->with('data');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
