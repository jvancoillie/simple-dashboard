<?php

namespace App\Repository;

use App\Entity\Menu;
use App\Entity\News;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NewsRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    const NAME = "News";

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, News::class);
    }

    public function getByDate(\DateTime $date)
    {
        return $this->createQueryBuilder('news')
            ->andWhere('news.publishAt = :date')
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
