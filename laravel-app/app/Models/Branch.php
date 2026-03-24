<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function parentBranch(){ return $this->belongsTo(self::class, 'parent_branch_id'); }
    public function children(){ return $this->hasMany(self::class, 'parent_branch_id'); }
    public function setup(){ return $this->hasOne(BranchSetup::class); }
    public function dailyEntries(){ return $this->hasMany(DailyEntry::class); }
}
