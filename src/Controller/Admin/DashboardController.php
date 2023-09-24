<?php

namespace App\Controller\Admin;

use App\Entity\Birthday;
use App\Entity\Menu;
use App\Entity\News;
use App\Entity\Screen;
use App\Entity\Week;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);

        return $this->redirect($adminUrlGenerator->setController(ScreenCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Dashboard')
            ->setFaviconPath('favicon.ico')
        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToRoute('Homepage', 'fas fa-home', 'homepage');
        yield MenuItem::section('configuration');
        yield MenuItem::linkToCrud('Écran', 'fas fa-desktop', Screen::class);
        yield MenuItem::linkToCrud('Menu', 'fa fa-utensils', Menu::class);
        yield MenuItem::linkToCrud('News', 'fa fa-info', News::class);
        yield MenuItem::linkToCrud('Birthday', 'fa fa-birthday-cake', Birthday::class);
        yield MenuItem::linkToCrud('Week', 'fa fa-calendar-week', Week::class);
    }
}
