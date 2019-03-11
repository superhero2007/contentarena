<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 23/12/2017
 * Time: 11:09 PM
 */

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Repository\UserRepository;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class GetFullSeasonsCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('arena:seasons')
            ->setDescription('Synchronizes Sport Radar database with ours ');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $sportRadarService = $this->getContainer()->get('AppBundle\Service\SportRadarService');
        $sportRadarService->syncAllSeasons();
    }
}
