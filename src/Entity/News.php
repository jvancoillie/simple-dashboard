<?php

namespace App\Entity;

use App\Repository\NewsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NewsRepository::class)]
class News implements WidgetInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'text')]
    private ?string $content = null;

    #[ORM\ManyToMany(targetEntity: Screen::class)]
    private Collection $screens;

    #[ORM\Column(type: 'date')]
    private $startDate;

    #[ORM\Column(type: 'date')]
    private $endDate;

    public function __construct()
    {
        $this->screens = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
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
