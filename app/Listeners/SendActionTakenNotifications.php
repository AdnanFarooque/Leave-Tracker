<?php

namespace App\Listeners;

use App\Events\ActionTaken;
use App\Models\User;
use App\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendActionTakenNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ActionTaken $event): void
    {
        $user = User::whereNot('id', $event->leaveModel->user_id)->get();
        dd($user);
        $user->notify(new Notification($event->leaveModel));
    }
}
