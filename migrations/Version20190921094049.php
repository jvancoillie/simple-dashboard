<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190921094049 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf('mysql' !== $this->connection->getDatabasePlatform()->getName(), 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE week_screen (week_id INT NOT NULL, screen_id INT NOT NULL, INDEX IDX_AB361863C86F3B2F (week_id), INDEX IDX_AB36186341A67722 (screen_id), PRIMARY KEY(week_id, screen_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE birthday_screen (birthday_id INT NOT NULL, screen_id INT NOT NULL, INDEX IDX_930B615EB8DB2791 (birthday_id), INDEX IDX_930B615E41A67722 (screen_id), PRIMARY KEY(birthday_id, screen_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE menu_screen (menu_id INT NOT NULL, screen_id INT NOT NULL, INDEX IDX_C0B39E8CCD7E912 (menu_id), INDEX IDX_C0B39E841A67722 (screen_id), PRIMARY KEY(menu_id, screen_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE news_screen (news_id INT NOT NULL, screen_id INT NOT NULL, INDEX IDX_53E5A244B5A459A0 (news_id), INDEX IDX_53E5A24441A67722 (screen_id), PRIMARY KEY(news_id, screen_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE week_screen ADD CONSTRAINT FK_AB361863C86F3B2F FOREIGN KEY (week_id) REFERENCES week (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE week_screen ADD CONSTRAINT FK_AB36186341A67722 FOREIGN KEY (screen_id) REFERENCES screen (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE birthday_screen ADD CONSTRAINT FK_930B615EB8DB2791 FOREIGN KEY (birthday_id) REFERENCES birthday (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE birthday_screen ADD CONSTRAINT FK_930B615E41A67722 FOREIGN KEY (screen_id) REFERENCES screen (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE menu_screen ADD CONSTRAINT FK_C0B39E8CCD7E912 FOREIGN KEY (menu_id) REFERENCES menu (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE menu_screen ADD CONSTRAINT FK_C0B39E841A67722 FOREIGN KEY (screen_id) REFERENCES screen (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE news_screen ADD CONSTRAINT FK_53E5A244B5A459A0 FOREIGN KEY (news_id) REFERENCES news (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE news_screen ADD CONSTRAINT FK_53E5A24441A67722 FOREIGN KEY (screen_id) REFERENCES screen (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf('mysql' !== $this->connection->getDatabasePlatform()->getName(), 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE week_screen');
        $this->addSql('DROP TABLE birthday_screen');
        $this->addSql('DROP TABLE menu_screen');
        $this->addSql('DROP TABLE news_screen');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE utf8mb4_bin');
    }
}
