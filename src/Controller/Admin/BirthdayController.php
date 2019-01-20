<?php

namespace App\Controller\Admin;

use App\Entity\Birthday;
use App\Form\BirthdayType;
use App\Form\ImportType;
use App\Repository\BirthdayRepository;
use League\Csv\Reader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/birthday")
 */
class BirthdayController extends AbstractController
{
    /**
     * @Route("/", name="admin_birthday_index", methods="GET")
     */
    public function index(BirthdayRepository $birthdayRepository, Request $request): Response
    {
        $form = $this->createForm(ImportType::class, null, [ 'action' => $this->generateUrl('admin_birthday_import')]);

        return $this->render('admin/birthday/index.html.twig', [
            'birthdays' => $birthdayRepository->findAll(),
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/new", name="admin_birthday_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $birthday = new Birthday();
        $form = $this->createForm(BirthdayType::class, $birthday);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($birthday);
            $em->flush();

            return $this->redirectToRoute('admin_birthday_index');
        }

        return $this->render('admin/birthday/new.html.twig', [
            'birthday' => $birthday,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/edit", name="admin_birthday_edit", methods="GET|POST")
     */
    public function edit(Request $request, Birthday $birthday): Response
    {
        $form = $this->createForm(BirthdayType::class, $birthday);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_birthday_index', ['id' => $birthday->getId()]);
        }

        return $this->render('admin/birthday/edit.html.twig', [
            'birthday' => $birthday,
            'form' => $form->createView(),
        ]);
    }



    /**
     * @Route("/truncate", name="admin_birthday_truncate", methods="DELETE")
     */
    public function truncate(Request $request, BirthdayRepository $birthdayRepository): Response
    {
        if ($this->isCsrfTokenValid('truncate', $request->request->get('_token'))) {
            $birthdayRepository->truncate();
            $this->addFlash('success', 'truncate table success.');
        }

        return $this->redirectToRoute('admin_birthday_index');
    }

    /**
     * @Route("/{id}/delete", name="admin_birthday_delete", methods="DELETE")
     */
    public function delete(Request $request, Birthday $birthday): Response
    {
        if ($this->isCsrfTokenValid('delete'.$birthday->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($birthday);
            $em->flush();
        }

        return $this->redirectToRoute('admin_birthday_index');
    }

    /**
     * @Route("/import", name="admin_birthday_import", methods="POST")
     */
    public function import(BirthdayRepository $birthdayRepository, Request $request): Response
    {
        $form = $this->createForm(ImportType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $file = $data['file'];

            $reader = Reader::createFromPath($file->getPathname());
            $reader->setDelimiter(';');
            $reader->setHeaderOffset(0);
            $records = $reader->getRecords();

            $em = $this->getDoctrine()->getManager();

            foreach ($records as $offset => $record) {
                $birthday = new Birthday();
                $birthday
                    ->setFirstname($record['Prenom'])
                    ->setLastname($record['Nom'])
                    ->setDate(\DateTime::createFromFormat('d/m/Y', $record['Date']))
                ;
                $em->persist($birthday);
            }

            $em->flush();


            $this->addFlash('success', 'fichier importé');
        }

        return $this->redirectToRoute('admin_birthday_index');
    }
}
