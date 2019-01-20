<?php

namespace App\Repository;

use App\Entity\Menu;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Menu|null find($id, $lockMode = null, $lockVersion = null)
 * @method Menu|null findOneBy(array $criteria, array $orderBy = null)
 * @method Menu[]    findAll()
 * @method Menu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MenuRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    const NAME = "Menu";

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Menu::class);
    }

    public function getByDate(\DateTime $date)
    {
        return $this->createQueryBuilder('menu')
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
