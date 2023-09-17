<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: \App\Repository\MenuRepository::class)]
class Menu implements WidgetInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'text')]
    private ?string $content = null;

    #[ORM\Column(type: 'date')]
    private \DateTime|\DateTimeInterface $publishAt;

    #[ORM\ManyToMany(targetEntity: \App\Entity\Screen::class)]
    private \Doctrine\Common\Collections\ArrayCollection|array $screens;

    /**
     * Menu constructor.
     */
    public function __construct()
    {
        $this->publishAt = new \DateTime();
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

    public function getPublishAt(): ?\DateTimeInterface
    {
        return $this->publishAt;
    }

    public function setPublishAt(\DateTimeInterface $publishAt): self
    {
        $this->publishAt = $publishAt;

        return $this;
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

    public function removeScreen(Screen ...$screen): self
    {
        if ($this->screens->contains($screen)) {
            $this->screens->removeElement($screen);
        }

        return $this;
    }
}
