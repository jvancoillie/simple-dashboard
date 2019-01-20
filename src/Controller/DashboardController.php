<?php

namespace App\Controller;

use App\Manager\DashboardManager;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="dashboard", defaults={"style"="index"})
     * @Route("/{style}", name="dashboard_style", requirements={"style"="index|simple|planner"})
     */
    public function index(DashboardManager $dashboardManager, $style)
    {
        $date = new \DateTime();
        $widgets = $dashboardManager->getWidgetsByDate($date);

        return $this->render(sprintf('dashboard/%s.html.twig', $style), [
            'widgets' => $widgets,
            'date' => $date,
        ]);
    }
}
