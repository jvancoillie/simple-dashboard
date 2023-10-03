<?php

namespace App\Controller\Admin;

use App\Entity\Birthday;
use App\Form\ImportType;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use League\Csv\Reader;

class BirthdayCrudController extends AbstractCrudController
{
    public function __construct(private readonly EntityManagerInterface $entityManager)
    {
    }

    public static function getEntityFqcn(): string
    {
        return Birthday::class;
    }

    public function import(AdminContext $context)
    {
        dump($context);
        $form = $this->createForm(ImportType::class);

        $form->handleRequest($context->getRequest());

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $file = $data['file'];
            $screens = $data['screens'];

            $errorLignes = [];

            $reader = Reader::createFromPath($file->getPathname());
            $reader->setDelimiter(';');
            $reader->setHeaderOffset(0);
            $records = $reader->getRecords();
            $header = $reader->getHeader();

            $result = array_diff(['Nom', 'Prénom', 'Né(e) le', 'Classe'], $header);
            dump($result);
            if ($result) {
                $this->addFlash('danger', sprintf('Import impossible : colonne(s) manquante(s) %s', implode(' | ', $result)));
            } else {
                try {
                    foreach ($records as $offset => $record) {
                        dump($record);
                        if ($record['Prénom'] && $record['Nom'] && $record['Né(e) le'] && $record['Classe'] && \DateTime::createFromFormat('d/m/y', $record['Né(e) le'])) {
                            $birthday = new Birthday();
                            $birthday
                                ->addScreen(...$screens)
                                ->setFirstname($record['Prénom'])
                                ->setLastname($record['Nom'])
                                ->setDate(\DateTime::createFromFormat('d/m/y', $record['Né(e) le']))
                                ->setClassroom($record['Classe']);

                            $this->entityManager->persist($birthday);
                        } else {
                            $errorLignes[] = $offset;
                        }
                    }
                    if ($errorLignes) {
                        $this->addFlash('warning', sprintf('fichier importé sauf les lignes : %s', implode(' | ', $errorLignes)));
                    } else {
                        $this->addFlash('success', 'fichier importé');
                    }

                    $this->entityManager->flush();
                } catch (\Exception) {
                    $this->addFlash('danger', 'Erreur lors de l\'import');
                }
            }

            $url = $this->container->get(AdminUrlGenerator::class)
                ->setAction(Action::INDEX)
                ->generateUrl();

            return $this->redirect($url);
        }

        return $this->render('admin/import.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function configureActions(Actions $actions): Actions
    {
        $import = Action::new('import', 'Import', 'fa fa-file-import')
        ->linkToCrudAction('import')
        ->createAsGlobalAction();

        return $actions
            // ...
            ->add(Crud::PAGE_INDEX, $import)
        ;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('firstname'),
            TextField::new('lastname'),
            TextField::new('classroom'),
            DateField::new('date'),
            AssociationField::new('screens'),
        ];
    }
}
