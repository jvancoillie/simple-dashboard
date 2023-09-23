<?php

namespace App\Controller\Admin;

use App\Entity\Menu;
use App\Form\ImportType;
use App\Form\MenuType;
use App\Repository\MenuRepository;
use League\Csv\Reader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/admin/menu')]
class MenuController extends AbstractController
{
    #[Route(path: '/', name: 'admin_menu_index', methods: 'GET')]
    public function index(MenuRepository $menuRepository): Response
    {
        $form = $this->createForm(ImportType::class, null, ['action' => $this->generateUrl('admin_menu_import')]);

        return $this->render('admin/menu/index.html.twig', [
            'menus' => $menuRepository->findAll(),
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/new', name: 'admin_menu_new', methods: 'GET|POST')]
    public function new(Request $request): Response
    {
        $menu = new Menu();
        $form = $this->createForm(MenuType::class, $menu);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($menu);
            $em->flush();

            return $this->redirectToRoute('admin_menu_index');
        }

        return $this->render('admin/menu/new.html.twig', [
            'menu' => $menu,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/{id}/edit', name: 'admin_menu_edit', methods: 'GET|POST')]
    public function edit(Request $request, Menu $menu): Response
    {
        $form = $this->createForm(MenuType::class, $menu);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('admin_menu_index', ['id' => $menu->getId()]);
        }

        return $this->render('admin/menu/edit.html.twig', [
            'menu' => $menu,
            'form' => $form->createView(),
        ]);
    }

    #[Route(path: '/truncate', name: 'admin_menu_truncate', methods: 'POST')]
    public function truncate(Request $request, MenuRepository $menuRepository): Response
    {
        if ($this->isCsrfTokenValid('truncate', $request->request->get('_token'))) {
            $menuRepository->truncate();
            $this->addFlash('success', 'truncate table success.');
        }

        return $this->redirectToRoute('admin_menu_index');
    }

    #[Route(path: '/{id}/delete', name: 'admin_menu_delete', methods: 'POST')]
    public function delete(Request $request, Menu $menu): Response
    {
        if ($this->isCsrfTokenValid('delete'.$menu->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($menu);
            $em->flush();
        }

        return $this->redirectToRoute('admin_menu_index');
    }

    #[Route(path: '/import', name: 'admin_menu_import', methods: 'POST')]
    public function import(Request $request): Response
    {
        $form = $this->createForm(ImportType::class);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $file = $data['file'];
            $screens = $data['screens'];

            $reader = Reader::createFromPath($file->getPathname());
            $reader->setDelimiter(';');
            $reader->setHeaderOffset(0);
            $records = $reader->getRecords();

            $em = $this->getDoctrine()->getManager();

            try {
                foreach ($records as $offset => $record) {
                    $menu = new Menu();
                    $content = '';
                    foreach (['plat1', 'plat2', 'legume1', 'legume2'] as $index) {
                        if ('' !== $record[$index]) {
                            $content .= sprintf("* %s \n", $record[$index]);
                        }
                    }

                    $menu
                        ->addScreen(...$screens)
                        ->setContent($content)
                        ->setPublishAt(\DateTime::createFromFormat('d/m/Y', $record['date']));
                    $em->persist($menu);
                }

                $em->flush();

                $this->addFlash('success', 'fichier importé');
            } catch (\Exception) {
                $this->addFlash('danger', 'Erreur lors de l\'import');
            }
        }

        return $this->redirectToRoute('admin_menu_index');
    }
}
