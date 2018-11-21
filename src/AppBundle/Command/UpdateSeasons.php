<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 23/12/2017
 * Time: 11:09 PM
 */

namespace AppBundle\Command;

use AppBundle\Entity\Season;
use AppBundle\Entity\Tournament;
use AppBundle\Repository\SeasonRepository;
use AppBundle\Repository\TournamentRepository;
use Gettext\Translations;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Repository\UserRepository;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UpdateSeasons extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('arena:seasons')
            ->setDescription('Adds five seasons from current year to all tournaments')
        ;
    }

    private function isConsecutive($array) {
        return ((int)max($array)-(int)min($array) == (count($array)-1));
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /**
         * @var SeasonRepository $seasonRepository
         * @var TournamentRepository $tournamentRepository
         */
        //$translationsPath = $this->getContainer()->getParameter("upload_translations");
        $container = $this->getContainer();
        $entityManager = $container->get('doctrine')->getManager();
        $seasonRepository = $entityManager->getRepository('AppBundle:Season');
        $tournamentRepository = $entityManager->getRepository('AppBundle:Tournament');
        $tournaments = $tournamentRepository->findAll();
        $currentYear = date("Y");

        foreach ($tournaments as $tournament){
            /* @var Tournament $tournament */
            echo PHP_EOL. "Tournament: " . $tournament->getName() . PHP_EOL;
            $seasons = $seasonRepository->findBy(array("tournament"=>$tournament));
            $seasonYears = [];
            $hasSplittedSeason = false;
            foreach ($seasons as $season){
                /* @var Season $season */

                echo "Season: " . $season->getYear() . PHP_EOL;
                $year = explode("/" ,$season->getYear() );

                if ( count($year) > 1 ){
                    //echo "This season has split years " . PHP_EOL;
                    $hasSplittedSeason = true;
                    $seasonYears[] = $season->getYear();
                } else {
                    //echo "This season has a plain year" . PHP_EOL;
                    $seasonYears[] = $year[0];
                }
            }

            $consecutive =  ( count($seasonYears) > 1 ) ? $this->isConsecutive($seasonYears) : false;

            if ( $consecutive ){
                echo "Seasons are consecutive" . PHP_EOL;
                for ( $i = $currentYear; $i< $currentYear+5; $i++ ){
                    $time = new \DateTime();

                    if ($hasSplittedSeason){
                        $splittedSeason = substr($i, -2);
                        $splittedSeason = $splittedSeason . "/". ($splittedSeason + 1);

                        if (!in_array($splittedSeason, $seasonYears)){
                            echo "Custom season " . $splittedSeason . " will be created". PHP_EOL;
                            $newSeason = new Season();
                            $newSeason->setTournament($tournament);
                            $newSeason->setName($tournament->getName(). " " . $splittedSeason);
                            $newSeason->setYear($splittedSeason);
                            $newSeason->setExternalId("ca:season:".$time->getTimestamp());
                            $entityManager->persist($newSeason);
                            sleep(1);
                        }
                    } else {
                        if (!in_array($i, $seasonYears)){
                            echo "Custom season " . $i . " will be created". PHP_EOL;
                            $newSeason = new Season();
                            $newSeason->setTournament($tournament);
                            $newSeason->setName($tournament->getName(). " " . $i);
                            $newSeason->setYear($i);
                            $newSeason->setExternalId("ca:season:".$time->getTimestamp());
                            $entityManager->persist($newSeason);
                            sleep(1);
                        }
                    }

                }

                $entityManager->flush();

            } else {
                //echo "Seasons are NOT consecutive" . PHP_EOL;
            }


        }

        echo "Starting year: " . $currentYear;


    }
}