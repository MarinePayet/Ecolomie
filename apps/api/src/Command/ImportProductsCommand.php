<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

use App\Service\ImportJsonlService as ImportJsonlService;

#[AsCommand(name: 'app:import-products')]

class ImportProductsCommand extends Command
{   
    private $importJsonlService;

    public function __construct(ImportJsonlService $importJsonlService)
{
    $this->importJsonlService = $importJsonlService;

    // Appeler le constructeur parent
    parent::__construct();
}

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        // dd('import prd');
        $io = new SymfonyStyle($input, $output);
        $this->importJsonlService->importJsonl($io);

        return Command::SUCCESS;


    }
}