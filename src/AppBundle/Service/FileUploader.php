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

    /**
     * @param $image
     * @param $filePath
     * @return string
     * @throws \Exception
     */
    public function saveImage($image, $filePath ){

        $base_to_php = explode(',', $image);
        $data = base64_decode($base_to_php[1]);
        $imageDir = $this->getTargetDir() . "/";
        $imagePath = $imageDir. $filePath;
        if (!is_dir($imageDir) or !is_writable($imageDir)) {
            // Error if directory doesn't exist or isn't writable.
            throw new \Exception("Image directory doesn't exist or isn't writable.");
        } else if (is_file($imagePath) and !is_writable($imagePath)) {
            // Error if the file exists and isn't writable.
            throw new \Exception("the file exists and isn't writable.");
        }

        file_put_contents($imagePath,$data);

        return $this->getUploadsUriPrefix(). "/" . $filePath;
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
