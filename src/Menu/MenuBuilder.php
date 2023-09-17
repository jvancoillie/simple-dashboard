<?php

namespace App\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuBuilder
{
    public function __construct(private readonly FactoryInterface $factory)
    {
    }

    public function createAdminSidebarEventMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');
        $menu->setChildrenAttribute('class', 'nav flex-column');

        $menu->addChild('Screen', [
            'label' => 'menu.screen',
            'route' => 'admin_screen_index',
            'attributes' => [
                'icon' => 'fas fa-desktop',
            ],
        ]);

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

        $menu->addChild('Week', [
            'label' => 'menu.week',
            'route' => 'admin_week_index',
            'attributes' => [
                'icon' => 'fas fa-calendar-week',
            ],
        ]);

        return $menu;
    }
}
