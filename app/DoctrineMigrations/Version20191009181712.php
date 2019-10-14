<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191009181712 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_edited_programs (listing_id INT NOT NULL, edited_program_listing_id INT NOT NULL, INDEX IDX_9F2C0A65D4619D1A (listing_id), INDEX IDX_9F2C0A6511E25597 (edited_program_listing_id), PRIMARY KEY(listing_id, edited_program_listing_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing_edited_programs ADD CONSTRAINT FK_9F2C0A65D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE listing_edited_programs ADD CONSTRAINT FK_9F2C0A6511E25597 FOREIGN KEY (edited_program_listing_id) REFERENCES edited_program (id)');
        $this->addSql('ALTER TABLE listing DROP programs');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE listing_edited_programs');
        $this->addSql('ALTER TABLE listing ADD programs LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:object)\'');
    }
}
