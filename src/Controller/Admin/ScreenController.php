<?php

namespace App\Controller\Admin;

use App\Entity\News;
use App\Entity\Screen;
use App\Form\NewsType;
use App\Form\ScreenType;
use App\Repository\NewsRepository;
use App\Repository\ScreenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/admin/screen')]
class ScreenController extends AbstractController
{
    #[Route(path: '/', name: 'admin_screen_index', methods: 'GET')]
    public function index(ScreenRepository $screenRepository): Response
    {
        return $this->render('admin/screen/index.html.twig', ['screens' => $screenRepository->findAll()]);
    }

    #[Route(path: '/new', name: 'admin_screen_new', methods: 'GET|POST')]
    public function new(Request $request): Response
    {
        $screen= new Screen();
        $form = $this->createForm(ScreenType::class, $screen);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($screen);
            $em->flush();

            return $this->redirectToRoute('admin_screen_index');
        }

        return $this->render('admin/screen/new.html.twig', [
            'screen' => $screen,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/{id}/edit', name: 'admin_screen_edit', methods: 'GET|POST')]
    public function edit(Request $request, Screen $screen): Response
    {
        $form = $this->createForm(NewsType::class, $screen);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_screen_index', ['id' => $screen->getId()]);
        }

        return $this->render('admin/screen/edit.html.twig', [
            'screen' => $screen,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/truncate', name: 'admin_screen_truncate', methods: 'POST')]
    public function truncate(Request $request, ScreenRepository $screenRepository): Response
    {
        if ($this->isCsrfTokenValid('truncate', $request->request->get('_token'))) {
            $screenRepository->truncate();
            $this->addFlash('success', 'truncate table success.');
        }

        return $this->redirectToRoute('admin_screen_index');
    }

    #[Route(path: '/{id}/delete', name: 'admin_screen_delete', methods: 'POST')]
    public function delete(Request $request, Screen $screen): Response
    {
        if ($this->isCsrfTokenValid('delete'.$screen->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($screen);
            $em->flush();
        }

        return $this->redirectToRoute('admin_screen_index');
    }
}
