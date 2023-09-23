<?php

namespace App\Entity;

use App\Repository\WeekRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WeekRepository::class)]
class Week implements WidgetInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'text')]
    private $content;

    #[ORM\Column(type: 'date')]
    private $startDate;

    #[ORM\Column(type: 'date')]
    private $endDate;

    #[ORM\ManyToMany(targetEntity: Screen::class)]
    private Collection $screens;

    public function __construct()
    {
        $this->screens = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent(mixed $content): void
    {
        $this->content = $content;
    }

    public function getStartDate()
    {
        return $this->startDate;
    }

    public function setStartDate(mixed $startDate): void
    {
        $this->startDate = $startDate;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function setEndDate(mixed $endDate): void
    {
        $this->endDate = $endDate;
    }

    /**
     * @return Collection|Screen[]
     */
    public function getScreens(): Collection
    {
        return $this->screens;
    }

    public function addScreen(Screen ...$screens): self
    {
        foreach ($screens as $screen) {
            if (!$this->screens->contains($screen)) {
                $this->screens[] = $screen;
            }
        }

        return $this;
    }

    public function removeScreen(Screen $screen): self
    {
        if ($this->screens->contains($screen)) {
            $this->screens->removeElement($screen);
        }

        return $this;
    }
}
