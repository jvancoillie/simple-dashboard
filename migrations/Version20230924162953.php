<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230924162953 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE menu ADD image_name VARCHAR(255) DEFAULT NULL, ADD image_size INT DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD start_date DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD end_date DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', DROP content, DROP publish_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE menu ADD content LONGTEXT NOT NULL, ADD publish_at DATE NOT NULL, DROP image_name, DROP image_size, DROP updated_at, DROP start_date, DROP end_date');
    }
}
