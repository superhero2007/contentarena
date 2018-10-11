<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 23/12/2017
 * Time: 11:09 PM
 */

namespace AppBundle\Command;

use Gettext\Translations;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Repository\UserRepository;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UpdateTranslations extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('arena:translations')
            ->setDescription('Compiles translations from .po file')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        /**
         * @var UserRepository
         */
        $localesPath = $this->getContainer()->getParameter("dev_locales");
        $translationsPath = $this->getContainer()->getParameter("upload_translations");
        $translations = Translations::fromPoFile($localesPath . "/en.po");

        //Export to a js file
        $prefix = "{\"en\":";
        $test = $translations->toJsonDictionaryString();
        $suffix = ",\"options\": {\"plural_rule\": \"n != 1\",\"plural_number\": \"2\"}}";
        $fs = new Filesystem();

        try {
            $fs->dumpFile($translationsPath . '/translations.json', $prefix.$test.$suffix);
        }
        catch(IOException $e) {
        }
    }
}