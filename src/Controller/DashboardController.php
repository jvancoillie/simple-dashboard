<?php

namespace App\Controller;

use App\Entity\Screen;
use App\Manager\DashboardManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    #[Route(path: '/', name: 'homepage')]
    public function index(DashboardManager $dashboardManager): \Symfony\Component\HttpFoundation\Response
    {
        $screens = $dashboardManager->getScreens();

        return $this->render('dashboard/index.html.twig', [
            'screens' => $screens,
        ]);
    }

    #[Route(path: '/screen/{id}', name: 'dashboard_screen')]
    public function screen(Screen $screen, DashboardManager $dashboardManager): \Symfony\Component\HttpFoundation\Response
    {
        $date = new \DateTime();
        $widgets = $dashboardManager->getWidgetsByDateAndScreen($date, $screen);

        return $this->render('dashboard/screen.html.twig', [
            'widgets' => $widgets,
            'date' => $date,
        ]);
    }
}
