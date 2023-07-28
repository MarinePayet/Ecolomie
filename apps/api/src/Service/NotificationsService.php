<?php


namespace App\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Notifier\Notification\Notification;
use Symfony\Component\Notifier\NotifierInterface;
use Symfony\Component\Notifier\Recipient\Recipient;
use Symfony\Component\Notifier\Message\ChatMessage;
use Symfony\Component\Notifier\Bridge\Firebase\Notification\AndroidNotification;
use Symfony\Component\Notifier\ChatterInterface;


class NotificationsService
{

    public function __construct(private ChatterInterface $chatter)
    {
        
    }

    public function create()
    {
    
        // ...
        $notification = new ChatMessage('HELLO WORLD ');
        
        // Create AndroidNotification options
        $androidOptions = (new AndroidNotification('/topics/news', []))
            ->icon('myicon')
            ->tag('myNotificationId')
            ->color('#cccccc')
            ->clickAction('OPEN_ACTIVITY_1')
            // ...
            ;
        
        // Add the custom options to the chat message and send the message
        $notification->options($androidOptions);
        
        $this->chatter->send($notification);
    }


}