<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 23/12/2017
 * Time: 11:09 PM
 */

namespace AppBundle\Command;

use AppBundle\Entity\Content;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Sport;
use AppBundle\Entity\User;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use AppBundle\Service\JobService;
use AppBundle\Service\NotificationService;
use AppBundle\Service\UserService;
use Gettext\Translations;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Repository\UserRepository;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Constraints\Country;

class JobCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('jobs:run')
            ->setDescription('Run scheduled jobs')
        ;
    }

    private $jobService;


    public function __construct(
        JobService $jobService
    )
    {
        parent::__construct();
        $this->jobService = $jobService;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $this->jobService->runJobs();

    }
}