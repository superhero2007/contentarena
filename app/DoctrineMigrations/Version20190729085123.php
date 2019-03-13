<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190729085123 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE fixture (id INT AUTO_INCREMENT NOT NULL, season_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, round VARCHAR(255) DEFAULT NULL, externalId VARCHAR(255) DEFAULT NULL, date DATETIME DEFAULT NULL, time VARCHAR(5) DEFAULT NULL, timezone VARCHAR(255) DEFAULT NULL, custom TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_5E540EEA770AC6E (externalId), INDEX IDX_5E540EE4EC001D1 (season_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE fixture ADD CONSTRAINT FK_5E540EE4EC001D1 FOREIGN KEY (season_id) REFERENCES season (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE fixture');
    }
}
