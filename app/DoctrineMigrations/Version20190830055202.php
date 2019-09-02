<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190830055202 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_tournaments (listing_id INT NOT NULL, listing_tournament_id INT NOT NULL, INDEX IDX_B3A22391D4619D1A (listing_id), INDEX IDX_B3A223914453A15F (listing_tournament_id), PRIMARY KEY(listing_id, listing_tournament_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing_tournaments ADD CONSTRAINT FK_B3A22391D4619D1A FOREIGN KEY (listing_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE listing_tournaments ADD CONSTRAINT FK_B3A223914453A15F FOREIGN KEY (listing_tournament_id) REFERENCES tournament (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F0E45BA9A770AC6E ON season (externalId)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE listing_tournaments');
        $this->addSql('DROP INDEX UNIQ_F0E45BA9A770AC6E ON season');
    }
}
