<?php

namespace App\Models;

use App\Events\ActionTaken;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveModel extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'comment',
        'state',
        'type_leave',
        'start_date',
        'end_date',
        'leave_text',
    ];
    
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
    
    protected $dispatchesEvents = [
        'created' => ActionTaken::class,
    ];
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
