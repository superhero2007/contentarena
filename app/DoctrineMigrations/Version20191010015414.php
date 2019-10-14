<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191010015414 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_right (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, code VARCHAR(2) NOT NULL, territories_mode VARCHAR(255) DEFAULT NULL, exclusive TINYINT(1) NOT NULL, details LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing_rights DROP FOREIGN KEY FK_E598F0D0B2EB0A4F');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0B2EB0A4F FOREIGN KEY (listing_right_id) REFERENCES listing_right (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE listing_rights DROP FOREIGN KEY FK_E598F0D0B2EB0A4F');
        $this->addSql('DROP TABLE listing_right');
        $this->addSql('ALTER TABLE listing_rights DROP FOREIGN KEY FK_E598F0D0B2EB0A4F');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0B2EB0A4F FOREIGN KEY (listing_right_id) REFERENCES property_right (id)');
    }
}
