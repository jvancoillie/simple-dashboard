<?php

namespace App\Controller;

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
        $date = new \DateTime();
        $widgets = $dashboardManager->getWidgetsByDate($date);

        return $this->render('dashboard/index.html.twig', [
            'widgets' => $widgets,
            'date' => $date,
        ]);
    }

    /**
     * @Route("/screen", name="dashboard", defaults={"style"="screen"})
     * @Route("/{style}", name="dashboard_style", requirements={"style"="screen|simple|planner"})
     */
    public function screen(DashboardManager $dashboardManager, $style)
    {
        $date = new \DateTime();
        $widgets = $dashboardManager->getWidgetsByDate($date);

        return $this->render(sprintf('dashboard/%s.html.twig', $style), [
            'widgets' => $widgets,
            'date' => $date,
        ]);
    }
}
