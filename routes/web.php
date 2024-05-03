<?php

use App\Models\LeaveModel;
use App\Models\User;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LeaveModelController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    
    $users = User::with(['leave_models'])->get();
        
    $pending_request = 0;
    $approved_request = 0;
    $rejected_request = 0;
    $total_request = 0;
    
    foreach($users as $user)
    {
        foreach($user->leave_models as $leave)
        {
            if($leave->state == 0)
            {
                $pending_request = $pending_request + 1;
            }
            
            if($leave->state == 1)
            {
                $approved_request = $approved_request + 1;
            }
            
            if($leave->state == 2)
            {
                $rejected_request = $rejected_request + 1;
            }
        }
    }
    
    $total_request = $pending_request + $approved_request + $rejected_request;
    
    return Inertia::render('Dashboard', [
        'users' => $users,
        'pen_req' => $pending_request,
        'app_req' => $approved_request,
        'rej_req' => $rejected_request,
        'total' => $total_request,
    ]);
    
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/show', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('leave_models', LeaveModelController::class)
    ->only(['index', 'create', 'store', 'update'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
