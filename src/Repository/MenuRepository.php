<?php

namespace App\Repository;

use App\Entity\Menu;
use App\Entity\Screen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MenuRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    final public const NAME = "Menu";

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Menu::class);
    }

    public function getByDateAndScreen(\DateTime $date, Screen $screen)
    {
        return $this->createQueryBuilder('menu')
            ->innerJoin('menu.screens', 'screen')
            ->andWhere('screen = :screen')
            ->setParameter('screen', $screen)
            ->andWhere('menu.publishAt = :date')
            ->setParameter('date', $date->format('Y-m-d'))
            ->orderBy('menu.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function truncate()
    {
        return $this->createQueryBuilder('menu')
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
