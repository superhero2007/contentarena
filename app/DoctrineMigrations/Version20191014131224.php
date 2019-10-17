<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191014131224 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE fixture ADD listing_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE fixture ADD CONSTRAINT FK_5E540EED4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('CREATE INDEX IDX_5E540EED4619D1A ON fixture (listing_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE fixture DROP FOREIGN KEY FK_5E540EED4619D1A');
        $this->addSql('DROP INDEX IDX_5E540EED4619D1A ON fixture');
        $this->addSql('ALTER TABLE fixture DROP listing_id');
    }
}
