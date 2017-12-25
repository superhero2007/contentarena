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

        /**
         * @var UserRepository
         */
        $repository = $this->getContainer()->get('doctrine')->getManager()->getRepository('AppBundle:User');

        $userManager = $this->getContainer()->get('fos_user.user_manager');

        $entities = $repository->findNotEnabled();

        foreach($entities as $user){

            $output->writeln( $user->getUsername() );

            $confirmationUrl = $this->getContainer()->get('router')->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);

            $message = \Swift_Message::newInstance()
                ->setSubject('Welcome to Content Arena')
                ->setFrom('info@contentarena.com', "Content Arena")
                ->setTo($user->getEmail())
                ->setBody(
                    $this->getContainer()->get('templating')->render(
                        'Registration/email.txt.twig',
                        array('user' => $user, 'confirmationUrl' => $confirmationUrl)
                    )
                )
            ;
            $this->getContainer()->get('mailer')->send($message);

            $message = \Swift_Message::newInstance()
                ->setSubject('Content Arena Reminders')
                ->setFrom('noreply@contentarena.com', "Content Arena Admin")
                ->setTo('info@contentarena.com')
                ->setBody(
                    $this->getContainer()->get('templating')->render(
                        'Registration/unconfirmed_admin_reminder.txt.twig',
                        array('user' => $user )
                    )
                )
            ;
            $this->getContainer()->get('mailer')->send($message);

            $user->setUnconfirmedChecked( true );

            $userManager->updateUser($user);



        }

    }
}