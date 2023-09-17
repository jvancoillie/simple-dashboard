<?php

namespace App\Repository;

use App\Entity\Birthday;
use App\Entity\Screen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Birthday|null find($id, $lockMode = null, $lockVersion = null)
 * @method Birthday|null findOneBy(array $criteria, array $orderBy = null)
 * @method Birthday[]    findAll()
 * @method Birthday[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BirthdayRepository extends ServiceEntityRepository implements DashboardRepositoryInterface
{
    final public const NAME = 'Birthday';

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Birthday::class);
    }

    public function getByDateAndScreen(\DateTime $date, Screen $screen)
    {
        return $this->createQueryBuilder('birthday')
            ->innerJoin('birthday.screens', 'screen')
            ->setParameter('screen', $screen)
            ->andWhere('screen = :screen')
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
