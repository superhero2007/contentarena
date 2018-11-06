<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 23/12/2017
 * Time: 11:09 PM
 */

namespace AppBundle\Command;

use AppBundle\Entity\Content;
use AppBundle\Service\EmailService;
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

class SendEmail extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('arena:email')
            ->setDescription('Sends test email')
            ->addArgument('type', InputArgument::REQUIRED, 'The type of the email.')
        ;
    }

    private $emailService;

    private $userService;

    public function __construct(EmailService $emailService, UserService $userService)
    {
        parent::__construct();
        $this->emailService = $emailService;
        $this->userService = $userService;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /**
         * @var EmailService $emailService
         */
        $container = $this->getContainer();
        $hostUrl = $container->getParameter("carena_host_url");
        $entityManager = $this->getContainer()->get('doctrine')->getManager();
        $userRepository = $entityManager->getRepository('AppBundle:User');
        $listingRepository = $entityManager->getRepository('AppBundle:Content');
        $listingStatusRepository = $entityManager->getRepository('AppBundle:ListingStatus');
        $type = $input->getArgument('type');
        $user = $userRepository->findOneBy(array("email"=>"juancruztalco@gmail.com"));
        $approvedStatus = $listingStatusRepository->findOneBy(array("name"=>"APPROVED"));
        $listing = $listingRepository->findOneBy(
            array('status'=>$approvedStatus),
            array('id' => 'DESC')
        );
        $expiredListings = $listingRepository->getExpiredByDate($user);
        $expireTomorrowListings = $listingRepository->getExpireTomorrow($user);
        $confirmationUrl = $this->getContainer()->get('router')->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
        $params = array(
            "hostUrl" => $hostUrl,
            "user" => $user,
            "confirmationUrl" => $confirmationUrl,
            "listing" => $listing
        );

        $output->writeln('Type: '.$input->getArgument('type'));

        switch ($type){

            case "listing_expiry":
                foreach ($expireTomorrowListings as $expiredListing){
                    /*  @var Content $expiredListing */
                    if ( !$expiredListing->isExpiryNotified() ){
                        $output->writeln('Listing'.$expiredListing->getCustomId()."-".$expiredListing->getExpiresAt()->format('H:i:s \O\n Y-m-d'));
                        $this->emailService->listingExpiry($expiredListing);
                        $expiredListing->setExpiryNotified(true);
                        $entityManager->persist($expiredListing);
                    }

                }
                $entityManager->flush();
                break;

            case "listing_expired":
                foreach ($expiredListings as $expiredListing){
                    /*  @var Content $expiredListing */
                    if ( !$expiredListing->isExpiredNotified() ){
                        $this->emailService->listingExpired($expiredListing);
                        $expiredListing->setExpiredNotified(true);
                        $entityManager->persist($expiredListing);
                    }

                }
                $entityManager->flush();
                break;

            case "register_user":
                $this->emailService->userRequestedLogin($params);
                break;

            case "welcome_user":
                $this->emailService->welcomeUser($params);
                break;

            case "activation_link":
                $this->emailService->sendActivationLink($params);
                break;

            case "forgot_password":
                $this->emailService->forgotPassword($params);
                break;

            case "listing_approved":
                $this->emailService->listingApproved($listing);
                break;

            case "listing_deactivated":
                $this->emailService->listingDeactivated($listing);
                break;

        }

    }
}