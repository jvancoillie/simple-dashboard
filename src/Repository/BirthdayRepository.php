<?php

namespace App\Repository;

use App\Entity\Birthday;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Birthday|null find($id, $lockMode = null, $lockVersion = null)
 * @method Birthday|null findOneBy(array $criteria, array $orderBy = null)
 * @method Birthday[]    findAll()
 * @method Birthday[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BirthdayRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    const NAME = "Birthday";

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Birthday::class);
    }

    public function getByDate(\DateTime $date)
    {
        return $this->createQueryBuilder('birthday')
            ->andWhere('DAY(birthday.date) = :day')
            ->andWhere('MONTH(birthday.date) = :month')
            ->setParameter('day', $date->format('d'))
            ->setParameter('month', $date->format('m'))
            ->orderBy('birthday.id', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function truncate()
    {
       return $this->createQueryBuilder('birthday')
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
