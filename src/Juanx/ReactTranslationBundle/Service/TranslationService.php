<?php

namespace Juanx\ReactTranslationBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Juanx\ReactTranslationBundle\Entity\Language;
use Juanx\ReactTranslationBundle\Entity\Translation;

class TranslationService
{
    private $em;

    private $translationRepository;

    private $languageRepository;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->em = $entityManager;
        $this->translationRepository = $entityManager->getRepository("JuanxReactTranslationBundle:Translation");
        $this->languageRepository = $entityManager->getRepository("JuanxReactTranslationBundle:Language");
    }

    public function getAllKeysByLanguage($languageCode = "en"){
        $language = new Language();
        $language->setCode($languageCode);
        //$response = $repo->findBy(array("language.code" => $language));
        $response = $this->translationRepository->findAll();
        return $response;
    }

    /**
     * @param $languageCode
     * @param $i18nKey
     * @param $value
     * @return Translation|null|object
     * @throws \Exception
     */
    public function updateKey($languageCode, $i18nKey, $value){
        $translation = $this->translationRepository->findOneBy(array("i18nKey" => $i18nKey));
        $language = $this->languageRepository->findOneBy(array("code"=>$languageCode));

        if ($language == null) throw new \Exception("Language not found");

        if ($translation == null){
            $translation = new Translation();
            $translation->setI18nKey($i18nKey);
            $translation->setLanguage($language);
        }

        $translation->setValue($value);
        $this->em->persist($translation);
        $this->em->flush();

        return $translation;
    }

    /**
     * @param $languageCode
     * @param $list
     * @throws \Exception
     */
    public function updateKeys($languageCode, $list){
        foreach ($list as $i18nKey => $value) {
            $this->updateKey($languageCode, $i18nKey, $value);
        }
    }

}
