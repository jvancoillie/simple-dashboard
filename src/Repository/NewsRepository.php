<?php

namespace App\Repository;

use App\Entity\Menu;
use App\Entity\News;
use App\Entity\Screen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    final public const NAME = 'News';

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, News::class);
    }

    public function getByDateAndScreen(\DateTime $date, Screen $screen)
    {
        return $this->createQueryBuilder('news')
            ->innerJoin('news.screens', 'screen')
            ->andWhere('screen = :screen')
            ->setParameter('screen', $screen)
            ->andWhere(':date BETWEEN news.startDate and news.endDate')
            ->setParameter('date', $date->format('Y-m-d'))
            ->orderBy('news.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function truncate()
    {
        return $this->createQueryBuilder('news')
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
