<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180615042229 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content ADD jurisdiction INT DEFAULT NULL, ADD start_date_mode VARCHAR(50) DEFAULT NULL, ADD end_date_mode VARCHAR(50) DEFAULT NULL, ADD end_date_limit INT DEFAULT NULL, ADD end_date DATETIME DEFAULT NULL, ADD start_date DATETIME DEFAULT NULL, ADD vat VARCHAR(5) DEFAULT NULL, ADD vat_percentage INT DEFAULT NULL, ADD programs LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\'');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A973C28F34 FOREIGN KEY (jurisdiction) REFERENCES country (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A973C28F34 ON content (jurisdiction)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A973C28F34');
        $this->addSql('DROP INDEX IDX_FEC530A973C28F34 ON content');
        $this->addSql('ALTER TABLE content DROP jurisdiction, DROP start_date_mode, DROP end_date_mode, DROP end_date_limit, DROP end_date, DROP start_date, DROP vat, DROP vat_percentage, DROP programs');
    }
}
