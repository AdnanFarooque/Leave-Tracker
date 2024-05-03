<?php

namespace App\Http\Controllers;

use App\Models\LeaveModel;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('LeaveModel/Create', [
        
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type_leave' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'leave_text' => 'required|string|max:255',
        ]);
        
        $request->user()->leave_models()->create($validated);
        
        return redirect(route('leave_models.create'));

    }

    /**
     * Display the specified resource.
     */
    public function show(LeaveModel $leaveModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LeaveModel $leaveModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LeaveModel $leaveModel): RedirectResponse
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:255',
            'state' => 'required|integer',
        ]);
        
        $leaveModel->update($validated);
        return redirect(route('leave_models.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LeaveModel $leaveModel)
    {
        //
    }
}
