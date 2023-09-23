<?php

namespace App\Twig;

use App\Utils\Markdown;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function __construct(private readonly Markdown $parser)
    {
    }

    public function getFilters(): array
    {
        return [
            new TwigFilter('md2html', $this->markdownToHtml(...), ['is_safe' => ['html']]),
        ];
    }

    /**
     * Transforms the given Markdown content into HTML content.
     */
    public function markdownToHtml(string $content): string
    {
        return $this->parser->toHtml($content);
    }
}
