<?php
/**
 * Created by PhpStorm.
 * User: juancruztalco
 * Date: 3/4/19
 * Time: 01:49
 */

namespace Test\AppBundle\Service;

use AppBundle\Doctrine\RandomIdGenerator;
use AppBundle\Entity\Content;
use AppBundle\Entity\ListingStatus;
use AppBundle\Entity\User;
use AppBundle\Enum\ListingStatusEnum;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use AppBundle\Service\FileUploader;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Tests\TestCase;
use Symfony\Component\HttpFoundation\Request;

class ContentServiceTest extends TestCase
{

    protected function setUp()
    {

    }

    private function getContentService(){

        // Last, mock the EntityManager to return the mock of the repository
        $objectManager = $this->createMock(EntityManager::class);
        $idGenerator = $this->createMock(RandomIdGenerator::class);
        $fileUploader = $this->createMock(FileUploader::class);
        $emailService = $this->createMock(EmailService::class);

        $objectManager->expects($this->any())
            ->method('getRepository')
            ->will($this->returnCallback(array($this, 'returnFn')));

        return new ContentService($objectManager, $idGenerator, $fileUploader, $emailService);
    }

    public function returnFn()
    {
        $args = func_get_args();
        $draftListingStatus = new ListingStatus();
        $draftListingStatus->setName(ListingStatusEnum::DRAFT);

        $draftListing = new Content();
        $draftListing->setName("Soccer");
        $draftListing->setStatus($draftListingStatus);
        $draftListing->setMockId(5);

        // Now, mock the repository so it returns the mock of the listings
        $listingRepository = $this->createMock(ObjectRepository::class);
        $listingRepository->expects($this->any())
            ->method('find')
            ->willReturn($draftListing);

        $listingStatusRepository = $this->createMock(ObjectRepository::class);
        $listingStatusRepository->expects($this->any())
            ->method('findOneBy')
            ->willReturn($draftListingStatus);

        if ($args[0] == "AppBundle:Content") return $listingRepository;

        // process $args[0] here and return the data you want to mock
        return $listingStatusRepository;
    }

    public function testSaveContentAsActive()
    {
        $user= new User();
        $request = new Request();
        $request->request->set("status", ListingStatusEnum::DRAFT);
        $request->initialize(
            $request->query->all(),
            $request->request->all(),
            $request->attributes->all(),
            $request->cookies->all(),
            $request->files->all(),
            $request->server->all(),
            '{"status":"DRAFT", "id": 5}'
        );

        $contentService = $this->getContentService();

        $savedListing = $contentService->saveContentAsActive($user, $request);

        $this->assertNotNull($savedListing->getPublishedAt() );
    }
}
