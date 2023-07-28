<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Notifier\Bridge\Firebase\Notification\AndroidNotification;
use Symfony\Component\Notifier\ChatterInterface;
use Symfony\Component\Notifier\Message\ChatMessage;
use Symfony\Component\Routing\Annotation\Route;


class InvoiceController extends AbstractController
{
    #[Route('/invoice', name: 'app_invoice')]
    public function index(): Response
    {
        return $this->render('invoice/index.html.twig', [
            'controller_name' => 'InvoiceController',
        ]);
    }

    #[Route('/invoice/create')]
    public function create(ChatterInterface $chatter): void
    {
        $chatMessage = new ChatMessage('');

        // Create AndroidNotification options
        $androidOptions = (new AndroidNotification('/topics/news', []))
            ->icon('myicon')
            ->sound('default')
            ->tag('myNotificationId')
            ->color('#cccccc')
            ->clickAction('OPEN_ACTIVITY_1')
            // ...
            ;
        
        // Add the custom options to the chat message and send the message
        $chatMessage->options($androidOptions);
        
        $chatter->send($chatMessage);

    }
}
