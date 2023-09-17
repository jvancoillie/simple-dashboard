<?php

namespace App\Repository;

use App\Entity\Menu;
use App\Entity\Screen;
use App\Entity\Week;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WeekRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    final public const NAME = "Week";

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Week::class);
    }

    public function getByDateAndScreen(\DateTime $date, Screen $screen)
    {
        return $this->createQueryBuilder('week')
            ->innerJoin('week.screens', 'screen')
            ->andWhere('screen = :screen')
            ->setParameter('screen', $screen)
            ->andWhere(':date BETWEEN week.startDate and week.endDate')
            ->setParameter('date', $date->format('Y-m-d'))
            ->orderBy('week.id', 'ASC')
            ->getQuery()
            ->getResult()
            ;
    }

    public function truncate()
    {
        return $this->createQueryBuilder('week')
            ->delete()
            ->getQuery()
            ->getResult()
            ;
    }

    public function getName()
    {
        return self::NAME;
    }
}
