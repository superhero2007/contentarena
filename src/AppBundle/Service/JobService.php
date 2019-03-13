<?php
/**
 * Created by PhpStorm.
 * User: Karen
 * Date: 27-Mar-18
 * Time: 17:16
 */

namespace AppBundle\Service;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\Job;
use AppBundle\Entity\Notification;
use AppBundle\Entity\User;
use AppBundle\Enum\JobTypeEnum;
use DateTimeZone;
use Doctrine\ORM\EntityManager;
use AppBundle\Doctrine\RandomIdGenerator;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Translation\TranslatorInterface;

class JobService
{

    private $em;

    private $accountIncompleteTime;

    private $accountIncompleteFromInviteTime;

    private $emailService;

    private $hostUrl;

    private $router;

    const TZ = 'UTC';

    public function __construct(
        EntityManager $entityManager,
        EmailService $emailService,
        Router $router,
        $accountIncompleteTime,
        $accountIncompleteFromInviteTime,
        $hostUrl
    ) {
        $this->em = $entityManager;
        $this->router = $router;
        $this->emailService = $emailService;
        $this->accountIncompleteTime = $accountIncompleteTime;
        $this->accountIncompleteFromInviteTime = $accountIncompleteFromInviteTime;
        $this->hostUrl = $hostUrl;
    }

    /**
     * @param $type
     * @param $user
     * @param $colleage
     * @param $timeToAdd
     * @throws \Doctrine\ORM\OptimisticLockException
     * @description: '+5 hours'
     */
    public function createJob($type, $user, $colleague, $timeToAdd){

        date_default_timezone_set($this::TZ);
        $runAt = new \DateTime();
        $now = new \DateTime();
        $runAt->modify($timeToAdd);
        $job = new Job();
        $job->setUser($user);
        $job->setType($type);
        $job->setCompleted(false);
        if ( $colleague != null ) $job->setColleague($colleague);
        $job->setCreatedAt($now);
        $job->setRunAt($runAt);
        $this->em->persist($job);
        $this->em->flush();

    }

    /**
     * @param $user
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createAccountIncompleteJob($user)
    {
        $type = JobTypeEnum::ACCOUNT_INCOMPLETE;
        $repo = $this->em->getRepository("AppBundle:Job");
        $job =  $repo->findOneBy(array(
            "user" => $user,
            "type" => $type
        ));

        if ( $job == null && $user != null) $this->createJob($type, $user, null, $this->accountIncompleteTime);


    }

    /**
     * @param $user
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createAccountAbortedJob($user)
    {
        $type = JobTypeEnum::ACCOUNT_ABORTED;
        $repo = $this->em->getRepository("AppBundle:Job");
        $job =  $repo->findOneBy(array(
            "user" => $user,
            "type" => $type
        ));

        if ( $job == null && $user != null) $this->createJob($type, $user, null, $this->accountIncompleteTime);


    }

    /**
     * @param $user
     * @param $colleage
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function createAccountIncompleteFromInviteJob($user, $colleage)
    {
        $type = JobTypeEnum::ACCOUNT_INCOMPLETE_FROM_INVITE;
        $repo = $this->em->getRepository("AppBundle:Job");
        $job =  $repo->findOneBy(array(
            "user" => $user,
            "type" => $type,
            "colleague" => $colleage
        ));

        if ( $job == null) $this->createJob($type, $user, $colleage, $this->accountIncompleteFromInviteTime);


    }

    /**
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function runJobs()
    {
        $repo = $this->em->getRepository("AppBundle:Job");
        $jobs = $repo->findBy(array("completed" => false));

        foreach ($jobs as $job){
            $this->runJob($job);
        }

        $this->em->flush();

    }

    /**
     * @param Job $job
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function runJob(Job $job)
    {

        date_default_timezone_set($this::TZ);
        $current_date = strtotime((new \DateTime())->format("Y-m-d H:i:s"));
        $expatriation_date = strtotime($job->getRunAt()->format("Y-m-d H:i:s"));
        $result = parse_url($this->hostUrl);
        $context = $this->router->getContext();
        $context->setHost($result['host']);
        $context->setScheme($result['scheme']);
        if ( $expatriation_date > $current_date ) return;

        /* @var User $user */
        switch ( $job->getType() ){
            case JobTypeEnum::ACCOUNT_INCOMPLETE:

                $user = $job->getUser();

                if ( $user != null && ( $user->getStatus() === null || $user->getStatus()->getName() !== "Active" ) ){
                    $confirmationUrl = $this->router->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
                    $this->emailService->accountIncomplete($user, $confirmationUrl);
                }
                $job->setCompleted(true);
                break;
            case JobTypeEnum::ACCOUNT_ABORTED:

                $user = $job->getUser();

                if ( $user != null && ( $user->getStatus() === null || $user->getStatus()->getName() !== "Active" ) ){
                    $confirmationUrl = $this->router->generate('app_registration', array(), UrlGeneratorInterface::ABSOLUTE_URL);
                    $this->emailService->accountIncomplete($user, $confirmationUrl);
                }
                $job->setCompleted(true);
                break;

            case JobTypeEnum::ACCOUNT_INCOMPLETE_FROM_INVITE:
                $user = $job->getUser();

                if (  $user != null && (  $user->getStatus() === null || $user->getStatus()->getName() !== "Active" ) ) {
                    $confirmationUrl = $this->router->generate('fos_user_registration_confirm_new', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
                    $this->emailService->accountIncompleteFromInvite($user, $job->getColleague(), $confirmationUrl);
                }
                $job->setCompleted(true);
                break;
        }

    }



}
