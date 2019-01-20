<?php

namespace App\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuBuilder
{
    private $factory;

    /**
     * @param FactoryInterface $factory
     */
    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createAdminSidebarEventMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'nav flex-column');

        $menu->addChild('Menu', [
            'label' => 'menu.menu',
            'route' => 'admin_menu_index',
            'attributes' => [
                'icon' => 'fas fa-utensils',
            ],
        ]);

        $menu->addChild('Birthday', [
            'label' => 'menu.birthday',
            'route' => 'admin_birthday_index',
            'attributes' => [
                'icon' => 'fas fa-birthday-cake',
            ],
        ]);

        $menu->addChild('News', [
            'label' => 'menu.news',
            'route' => 'admin_news_index',
            'attributes' => [
                'icon' => 'fas fa-info-circle',
            ],
        ]);

        return $menu;
    }
}