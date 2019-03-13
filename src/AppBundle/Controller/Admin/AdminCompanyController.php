<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 26/12/2017
 * Time: 12:05 AM
 */

namespace AppBundle\Controller\Admin;

use AppBundle\Entity\CompanyCategory;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use AppBundle\Entity\User;
use AppBundle\Entity\Company;
use AppBundle\Entity\Sport;
use AppBundle\Service\FileUploader;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateIntervalType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class AdminCompanyController extends BaseAdminController
{

    use \AppBundle\Helper\EmailHelper;

    public function switchUserAction(){

        $id = $this->request->query->get('id');
        $entity = $this->em->getRepository(User::class)->find($id);

        return $this->redirectToRoute('homepage', array(
            '_ghost_mode' => $entity->getEmail(),
        ));
    }

    /**
     * @Route("/company/import", name="importCompaniesPage")
     * @param Request $request
     * @return Response
     */
    public function importCompaniesPage(Request $request){

        $doctrine = $this->getDoctrine();
        $companyRepo = $doctrine->getRepository('AppBundle:Company');
        $companyCategoryRepo = $doctrine->getRepository('AppBundle:CompanyCategory');
        $countryRepo = $doctrine->getRepository('AppBundle:Country');
        $regionRepo = $doctrine->getRepository("AppBundle:Territory");
        $user = $this->getUser();
        $data = null;
        $companiesCreated = array();
        $companiesUpdated = array();
        $companiesSkippedByError = array();
        $companiesSkippedByCountry = array();
        $companiesSkippedByRegion = array();
        $rows = array();

        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('csvFile', FileType::class)
            ->add('send', SubmitType::class, array(
                'attr' => array('class' => 'btn btn-primary action-new'),
                'label' => 'Import'
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /* @var File $file*/
            $data = $form->getData();
            $file = $data['csvFile'];
            $ignoreFirstLine = true;
            $rows = array();
            if (($handle = fopen($file->getRealPath(), "r")) !== FALSE) {
                $i = 0;
                while (($data = fgetcsv($handle, null, ";")) !== FALSE) {
                    $i++;
                    if ($ignoreFirstLine && $i == 1) { continue; }
                    $rows[] = explode(",", $data[0]);
                }
                fclose($handle);
            }

            foreach ( $rows as $key => $row){

                $created = false;
                $companyName = trim($row[0]);
                $companyCategory = trim($row[1]);
                $companyWebsite = trim($row[2]);
                $companyCountry = trim($row[3]);
                $companyRegion = trim($row[4]);
                $companyFederation = trim($row[5]);

                $rowNumber = $key + 2; // plus one for index 0 and another one for skipping first row

                $company = $companyRepo->findOneBy(array("legalName" => $companyName ));
                $country = $countryRepo->findOneBy(array("name" => $companyCountry));
                $region = $regionRepo->findOneBy(array("name" => $companyRegion));

                if ( $companyCountry && $country == null ) {
                    $companiesSkippedByCountry[] = array(
                        "name" => $companyName,
                        "country" => $companyCountry,
                        "row" => $key + 2 // plus one for index 0 and another one for skipping first row
                    );
                    continue;
                }

                if ( $companyRegion && $region == null ) {
                    $companiesSkippedByRegion[] = array(
                        "name" => $companyName,
                        "region" => $companyRegion,
                        "row" => $rowNumber
                    );
                    continue;
                }

                if ( $company == null ) {

                    try {
                        $created = true;
                        $company = new Company();
                        $companiesCreated[] = array(
                            "name" => $companyName,
                            "row" => $rowNumber
                        );
                        $company->setLegalName($companyName);
                    }
                    catch(\Exception $exception) {
                        $companiesSkippedByError[] = array(
                            "name" => $companyName,
                            "row" => $rowNumber
                        );
                    }
                }

                if ($companyCategory){
                    $category = $companyCategoryRepo->findOneBy(array("name" => $companyCategory));

                    if ( $category == null ){
                        $category = new CompanyCategory();
                        $category->setName($companyCategory);
                    }

                    $company->setCategory($category);
                }

                if ($region) $company->setRegion($region);
                if ($companyFederation) $company->setFederation($companyFederation);
                if ($country) $company->setCountry($country);
                if ($companyWebsite) $company->setWebsite($companyWebsite);

                if (!$created) $companiesUpdated[] = array(
                    "name" => $companyName,
                    "row" => $rowNumber
                );

                $doctrine->getManager()->persist($company);
                $doctrine->getManager()->flush();

            }

        }

        $viewElements = array(
            'user' => $user,
            'form' => $form->createView(),
            'companiesCreated' => $companiesCreated,
            'companiesUpdated' => $companiesUpdated,
            'companiesSkippedByError' => $companiesSkippedByError,
            'companiesSkippedByCountry' => $companiesSkippedByCountry,
            'companiesSkippedByRegion' => $companiesSkippedByRegion,
            'companiesProcessed' => count($rows),
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('company/import.form.html.twig', $viewElements);
    }


    /**
     * @param string $entityClass
     * @param string $sortDirection
     * @param null $sortField
     * @param null $dqlFilter
     * @return \Doctrine\ORM\QueryBuilder
     */
    protected function createListQueryBuilder($entityClass, $sortDirection, $sortField = null, $dqlFilter = null)
    {
        /* @var EntityManager */
        $em = $this->getDoctrine()->getManagerForClass($this->entity['class']);
        /* @var DoctrineQueryBuilder */
        $queryBuilder = $em->createQueryBuilder()
            ->select('entity')
            ->from($this->entity['class'], 'entity');
            //->leftJoin('entity.status','status');

        $isSortedByDoctrineAssociation = false !== strpos($sortField, '.');
        if ($isSortedByDoctrineAssociation) {
            $sortFieldParts = explode('.', $sortField);
            $queryBuilder->leftJoin('entity.'.$sortFieldParts[0], $sortFieldParts[0]);
        }


        if (!empty($dqlFilter)) {
            $queryBuilder->andWhere($dqlFilter);
        }

        if (null !== $sortField) {
            $queryBuilder->orderBy(sprintf('%s%s', $isSortedByDoctrineAssociation ? '' : 'entity.', $sortField), $sortDirection);
        }

        return $queryBuilder;
    }


}
