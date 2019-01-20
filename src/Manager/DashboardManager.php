<?php
/**
 * Created by PhpStorm.
 * User: kami
 * Date: 03/01/2019
 * Time: 14:52
 */

namespace App\Manager;


use App\Repository\BirthdayRepository;
use App\Repository\DashboardRepositoryInterface;
use App\Repository\MenuRepository;
use App\Repository\NewsRepository;

class DashboardManager
{
    private $dashboardRepositories;

    /**
     * DashboardManager constructor.
     * @param $newsRepository
     * @param $birthdayRepository
     * @param $MenuRepository
     */
    public function __construct(NewsRepository $newsRepository, BirthdayRepository $birthdayRepository, MenuRepository $menuRepository)
    {
        $this->dashboardRepositories[$newsRepository->getName()] = $newsRepository;
        $this->dashboardRepositories[$birthdayRepository->getName()] = $birthdayRepository;
        $this->dashboardRepositories[$menuRepository->getName()] = $menuRepository;
    }

    public function getWidgetsByDate(\DateTime $date)
    {
        $result = [];

        /**
         * @var DashboardRepositoryInterface repository
         */
        foreach($this->dashboardRepositories as $name => $repository){
            $result[$name] = $repository->getByDate($date);
        }

        return $result;
    }

}