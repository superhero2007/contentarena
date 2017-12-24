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

class CheckUnconfirmedCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('arena:unconfirmed')
            ->setDescription('Resend email to unconfirmed users')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $text = 'Hello';
        $output->writeln($text);
    }
}