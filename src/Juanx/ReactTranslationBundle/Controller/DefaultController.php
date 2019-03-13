<?php

namespace Juanx\ReactTranslationBundle\Controller;

use Juanx\ReactTranslationBundle\Entity\Translation;
use Juanx\ReactTranslationBundle\Service\TranslationService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{

    /**
     * @param TranslationService $translationService
     * @return JsonResponse
     */
    public function indexAction(
        TranslationService $translationService
    )
    {

        $language = "en";
        $translations = $translationService->getAllKeysByLanguage($language);

        $response = array(
            "en" => array(
                "CMS_PROPERTY_VIEW_LISTING_OVERVIEW" => "Listing Overview"
            )
        );

        foreach ($translations as $translation){
            /* @var Translation $translation */
            $response[$language][$translation->getI18nKey()] = $translation->getValue();
        }

        return new JsonResponse($response);
    }

    /**
     * @param Request $request
     * @param TranslationService $translationService
     * @return JsonResponse
     * @throws \Exception
     */
    public function updateAction(
        Request $request,
        TranslationService $translationService
    ){

        $i18nKey = $request->get("i18nKey");
        $value = $request->get("value");
        $languageCode = $request->get("languageCode");

        $translation = $translationService->updateKey($languageCode, $i18nKey, $value);

        return new JsonResponse($translation);

    }

    /**
     * @param TranslationService $translationService
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Exception
     */
    public function importDevAction(
        TranslationService $translationService
    )
    {
        $language = "en";
        $filename =  "http://dev.contentarena.com/bundles/app/data/translations.json";
        $this->import($filename);
        $json = $this->import($filename);
        $translationService->updateKeys($language, $json[$language]);
        return $this->redirectToRoute("uploadLocales");
    }

    /**
     * @param TranslationService $translationService
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \Exception
     */
    public function importTestAction(
        TranslationService $translationService
    )
    {
        $language = "en";
        $filename =  "http://api.contentarena.com/bundles/app/data/translations.json";
        $json = $this->import($filename);
        $translationService->updateKeys($language, $json[$language]);
        return $this->redirectToRoute("uploadLocales");
    }

    private function import($filename)
    {
        $data = file_get_contents($filename);
        return json_decode($data, true);
    }
}
