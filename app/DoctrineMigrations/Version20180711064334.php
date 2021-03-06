<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180711064334 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_status (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content ADD status_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A96BF700BD FOREIGN KEY (status_id) REFERENCES listing_status (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A96BF700BD ON content (status_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A96BF700BD');
        $this->addSql('DROP TABLE listing_status');
        $this->addSql('DROP INDEX IDX_FEC530A96BF700BD ON content');
        $this->addSql('ALTER TABLE content DROP status_id');
    }
}
