<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181028212538 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A973C28F34');
        $this->addSql('DROP INDEX IDX_FEC530A973C28F34 ON content');
        $this->addSql('ALTER TABLE content CHANGE jurisdiction jurisdiction VARCHAR(255) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content CHANGE jurisdiction jurisdiction INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A973C28F34 FOREIGN KEY (jurisdiction) REFERENCES country (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A973C28F34 ON content (jurisdiction)');
    }
}
