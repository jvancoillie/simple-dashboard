<?php

namespace App\Controller;

use App\Entity\Screen;
use App\Manager\DashboardManager;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(DashboardManager $dashboardManager)
    {
        $screens = $dashboardManager->getScreens();

        return $this->render('dashboard/index.html.twig', [
            'screens' => $screens,
        ]);
    }

    /**
     * @Route("/screen/{id}", name="dashboard_screen")
     */
    public function screen(DashboardManager $dashboardManager, Screen $screen )
    {
        $date = new \DateTime();
        $widgets = $dashboardManager->getWidgetsByDateAndScreen($date, $screen);

        return $this->render('dashboard/screen.html.twig', [
            'widgets' => $widgets,
            'date' => $date,
        ]);
    }

}
