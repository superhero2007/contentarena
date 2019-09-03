<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190829154345 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_rights (property_id INT NOT NULL, listing_right_id INT NOT NULL, INDEX IDX_E598F0D0549213EC (property_id), INDEX IDX_E598F0D0B2EB0A4F (listing_right_id), PRIMARY KEY(property_id, listing_right_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0549213EC FOREIGN KEY (property_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0B2EB0A4F FOREIGN KEY (listing_right_id) REFERENCES property_right (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE listing_rights');
    }
}
