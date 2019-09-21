<?php
/**
 * Created by PhpStorm.
 * User: kami
 * Date: 03/01/2019
 * Time: 14:58
 */

namespace App\Repository;


use App\Entity\Screen;

/**
 * Interface DashboardRepositoryInterface
 * @package App\Repository
 */
interface DashboardRepositoryInterface
{

    /**
     * @param \DateTime $date
     * @return mixed
     */
    public function getByDateAndScreen(\DateTime $date, Screen $screen);

    public function getName();

}