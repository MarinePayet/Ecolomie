<?php

namespace App\Command;

use App\Importer\ProductImporter;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:import-products',
    description: 'Add a short description for your command',
)]
class ImportProductsCommand extends Command
{
    public function __construct(private ProductImporter $productImporter)
    {
        parent::__construct();
    }
    
    protected function configure(): void
    {
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
       $output->writeln('start');
       $this->productImporter->process();

        return Command::SUCCESS;
    }
}
