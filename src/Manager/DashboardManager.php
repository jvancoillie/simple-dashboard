<?php
/**
 * Created by PhpStorm.
 * User: kami
 * Date: 03/01/2019
 * Time: 14:52.
 */

namespace App\Manager;

use App\Entity\Screen;
use App\Repository\BirthdayRepository;
use App\Repository\DashboardRepositoryInterface;
use App\Repository\MenuRepository;
use App\Repository\NewsRepository;
use App\Repository\ScreenRepository;
use App\Repository\WeekRepository;

class DashboardManager
{
    /**
     * @var DashboardRepositoryInterface[]
     */
    private array $dashboardRepositories;

    /**
     * DashboardManager constructor.
     */
    public function __construct(NewsRepository $newsRepository, BirthdayRepository $birthdayRepository, MenuRepository $menuRepository, WeekRepository $weekRepository, private readonly ScreenRepository $screenRepository)
    {
        $this->dashboardRepositories[$newsRepository->getName()] = $newsRepository;
        $this->dashboardRepositories[$birthdayRepository->getName()] = $birthdayRepository;
        $this->dashboardRepositories[$menuRepository->getName()] = $menuRepository;
        $this->dashboardRepositories[$weekRepository->getName()] = $weekRepository;
    }

    public function getWidgetsByDateAndScreen(\DateTime $date, Screen $screen): array
    {
        $result = [];

        /*
         * @var DashboardRepositoryInterface repository
         */
        foreach ($this->dashboardRepositories as $name => $repository) {
            $result[$name] = $repository->getByDateAndScreen($date, $screen);
        }

        return $result;
    }

    public function getScreens(): array
    {
        return $this->screenRepository->findAll();
    }
}
