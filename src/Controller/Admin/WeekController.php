<?php

namespace App\Controller\Admin;

use App\Entity\Week;
use App\Form\WeekType;
use App\Repository\WeekRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/admin/week')]
class WeekController extends AbstractController
{
    #[Route(path: '/', name: 'admin_week_index', methods: 'GET')]
    public function index(WeekRepository $weekRepository): Response
    {
        return $this->render('admin/week/index.html.twig', ['weeks' => $weekRepository->findAll()]);
    }

    #[Route(path: '/new', name: 'admin_week_new', methods: 'GET|POST')]
    public function new(Request $request): Response
    {
        $week = new Week();
        $form = $this->createForm(WeekType::class, $week);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($week);
            $em->flush();

            return $this->redirectToRoute('admin_week_index');
        }

        return $this->render('admin/week/new.html.twig', [
            'week' => $week,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/{id}/edit', name: 'admin_week_edit', methods: 'GET|POST')]
    public function edit(Request $request, Week $week): Response
    {
        $form = $this->createForm(WeekType::class, $week);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_week_index', ['id' => $week->getId()]);
        }

        return $this->render('admin/week/edit.html.twig', [
            'week' => $week,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/truncate', name: 'admin_week_truncate', methods: 'POST')]
    public function truncate(Request $request, WeekRepository $weekRepository): Response
    {
        if ($this->isCsrfTokenValid('truncate', $request->request->get('_token'))) {
            $weekRepository->truncate();
            $this->addFlash('success', 'truncate table success.');
        }

        return $this->redirectToRoute('admin_week_index');
    }

    #[Route(path: '/{id}/delete', name: 'admin_week_delete', methods: 'POST')]
    public function delete(Request $request, Week $week): Response
    {
        if ($this->isCsrfTokenValid('delete'.$week->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($week);
            $em->flush();
        }

        return $this->redirectToRoute('admin_week_index');
    }
}
