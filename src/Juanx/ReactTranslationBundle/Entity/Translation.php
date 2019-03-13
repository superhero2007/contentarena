<?php

namespace Juanx\ReactTranslationBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Translation
 *
 * @ORM\Table(name="translation")
 * @ORM\Entity(repositoryClass="Juanx\ReactTranslationBundle\Repository\TranslationRepository")
 */
class Translation
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="i18nKey", type="string", length=255)
     */
    private $i18nKey;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text", nullable=true)
     */
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity="Juanx\ReactTranslationBundle\Entity\Language")
     * @ORM\JoinColumn(nullable=true)
     */
    private $language;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set i18nKey
     *
     * @param string $i18nKey
     *
     * @return Translation
     */
    public function setI18nKey($i18nKey)
    {
        $this->i18nKey = $i18nKey;

        return $this;
    }

    /**
     * Get i18nKey
     *
     * @return string
     */
    public function getI18nKey()
    {
        return $this->i18nKey;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return Translation
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @return mixed
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @param mixed $language
     */
    public function setLanguage($language)
    {
        $this->language = $language;
    }


}

