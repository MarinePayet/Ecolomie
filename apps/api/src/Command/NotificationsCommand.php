<?php


namespace App\Command;

use App\Service\NotificationsService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Notifier\Notification\Notification;
use Symfony\Component\Notifier\NotifierInterface;
use Symfony\Component\Notifier\Recipient\Recipient;
use Symfony\Component\Notifier\Message\ChatMessage;
use Symfony\Component\Notifier\Bridge\Firebase\Notification\AndroidNotification;
use Symfony\Component\Notifier\ChatterInterface;

#[AsCommand(name: 'app:send-notif')]
class NotificationsCommand extends Command
{
    public function __construct(
        private NotificationsService $notificationsService,
    ){
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $this->notificationsService->create();

        return Command::SUCCESS;
    }
    
    


}