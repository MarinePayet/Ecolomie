<?php

namespace App\Command;

use App\Service\ImportProductsService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:import-product')]
class ImportProductsCommand extends Command
{
    public function __construct(
        private ImportProductsService $importProductsService,
    ){
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $this->importProductsService->importProducts($io);

        return Command::SUCCESS;
    }

}