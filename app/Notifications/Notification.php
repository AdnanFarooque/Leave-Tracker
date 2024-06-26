<?php

namespace App\Notifications;

use App\Models\LeaveModel;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Str;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Notification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public LeaveModel $leaveModel)
    {

        //

    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject("New Notification from {$this->leaveModel->user->name}")
                    ->greeting("New Notification from {$this->leaveModel->user->name}")
                    ->line(Str::limit($this->leaveModel->leave_text, 50))
                    ->action('Go to Leave History', url('/profile/show'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
