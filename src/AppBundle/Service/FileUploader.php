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
    private $tmpTargetDir;
    private $uploadsUriPrefix;
    private $uploadsTmpUriPrefix;

    public function __construct($targetDir, $tmpTargetDir, $uploadsUriPrefix, $uploadsTmpUriPrefix)
    {
        $this->targetDir = $targetDir;
        $this->tmpTargetDir = $tmpTargetDir;
        $this->uploadsUriPrefix = $uploadsUriPrefix;
        $this->uploadsTmpUriPrefix = $uploadsTmpUriPrefix;
    }

    public function saveImage( $image, $filepath ){
        $base_to_php = explode(',', $image);
        $data = base64_decode($base_to_php[1]);
        file_put_contents($this->getTargetDir() . "/". $filepath,$data);

        return $this->getUploadsUriPrefix(). "/" . $filepath;
    }

    public function upload(UploadedFile $file)
    {
        $extension = $file->guessExtension();
        $fileName = md5(uniqid()).'.'.$extension;

        $file->move($this->getTargetDir() . "/" . $extension , $fileName);

        return $this->getUploadsUriPrefix(). "/" . $extension . "/" . $fileName;
    }

    public function tmpUpload(UploadedFile $file)
    {
        $extension = $file->guessExtension();
        $fileName = md5(uniqid()).'.'.$extension;

        $file->move($this->tmpTargetDir . "/" . $extension , $fileName);

        return $this->uploadsTmpUriPrefix. "/" . $extension . "/" . $fileName;
    }

    public function removeFile( $file )
    {
        if (file_exists($file)) {
            unlink($file);
        } else {
            return false;
        }

        return true;
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