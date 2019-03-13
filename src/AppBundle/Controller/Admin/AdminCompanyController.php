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

    static $EXPORT_DATA = array(
        "Name",
        "Company Country",
        "Company Region",
        "Website",
        "Category",
        "Fed/Club/League Sport",
        "City",
        "Address",
        "Address 2",
        "Zip",
        "Phone",
        "VAT",
        "Registration Number",
        "CreatedAt",
    );

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
        $sportRepo = $doctrine->getRepository("AppBundle:Sport");
        $user = $this->getUser();
        $data = null;
        $companiesCreated = array();
        $companiesUpdated = array();
        $companiesSkippedByError = array();
        $companiesSkippedByCountry = array();
        $companiesSkippedByRegion = array();
        $companiesSkippedBySport = array();
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
                $companySport = trim($row[5]);

                $rowNumber = $key + 2; // plus one for index 0 and another one for skipping first row

                $company = $companyRepo->findOneBy(array("legalName" => $companyName ));
                if ($companyCountry) $country = $countryRepo->findOneBy(array("name" => $companyCountry));
                if ($companyRegion) $region = $regionRepo->findOneBy(array("name" => $companyRegion));
                if ($companySport) $sport = $sportRepo->findOneBy(array("name" => $companySport));

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

                if ( $companySport && $sport == null ) {
                    $companiesSkippedBySport[] = array(
                        "name" => $companyName,
                        "sport" => $companySport,
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
                if ($sport) $company->setSport($sport);
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
            'companiesSkippedBySport' => $companiesSkippedBySport,
            'companiesProcessed' => count($rows),
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('company/import.form.html.twig', $viewElements);
    }

    /**
     * @Route("/company/export", name="exportCompaniesPage")
     * @param Request $request
     * @return Response
     */
    public function exportCompaniesPage(Request $request){

        $user = $this->getUser();
        $repo = $this->getDoctrine()->getRepository('AppBundle:Company');
        $data = null;
        $defaultData = array();
        $form = $this->createFormBuilder($defaultData)
            ->add('send', SubmitType::class, array(
                'attr' => array('class' => 'btn btn-primary action-new'),
                "label" => "Download"
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $companies = $repo->findAll();
            $content = $this->companiesToCsvExport($companies);
            return $this->csvResponse($content);
        }


        $viewElements = array(
            'user' => $user,
            //'message' => $message,
            'form' => $form->createView(),
            'hostUrl' => $this->container->getParameter("carena_host_url")
        );

        return $this->render('company/export.form.html.twig', $viewElements);
    }

    private function csvResponse($content, $name = "Content Arena Companies.csv"){
        $response = new Response($content);

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$name.'"');

        return $response;
    }

    private function companiesToCsvExport(array $companies){
        $rows[] = implode(',', $this::$EXPORT_DATA);

        foreach ( $companies as $company ){
            /* @var User $user*/
            /* @var Company $company*/
            $rows[] = implode(',', array(
                $company->getLegalName(),
                ($company->getCountry() != null) ? $company->getCountry()->getName() : "",
                ($company->getRegion() != null) ? $company->getRegion()->getName() : "",
                $company->getWebsite(),
                ($company->getCategory()) ? $company->getCategory()->getName() : "",
                ($company->getSport()) ? $company->getSport()->getName() : "",
                $company->getCity(),
                $company->getAddress(),
                $company->getAddress2(),
                $company->getZip(),
                $company->getPhone(),
                $company->getVat(),
                $company->getRegistrationNumber(),
                ($company->getCreatedAt() != null) ? $company->getCreatedAt()->format('Y-m-d H:i:s') : ""
            ));
        }

        return implode("\n", $rows);
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
