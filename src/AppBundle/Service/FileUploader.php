<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;


class FileUploader
{

    private $targetDir;

    private $uploadsUriPrefix;

    public function __construct($targetDir, $uploadsUriPrefix)
    {
        $this->targetDir = $targetDir;
        $this->uploadsUriPrefix = $uploadsUriPrefix;
    }

    public function upload(UploadedFile $file)
    {
        $extension = $file->guessExtension();
        $fileName = md5(uniqid()).'.'.$extension;

        $file->move($this->getTargetDir() . "/" . $extension , $fileName);

        return $this->getUploadsUriPrefix(). "/" . $extension . "/" . $fileName;
    }

    public function getTargetDir()
    {
        return $this->targetDir;
    }

    /**
     * @return mixed
     */
    public function getUploadsUriPrefix()
    {
        return $this->uploadsUriPrefix;
    }



}