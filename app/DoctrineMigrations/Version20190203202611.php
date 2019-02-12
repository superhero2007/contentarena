<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190203202611 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE company_definitions ADD edited TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE source_definitions ADD edited TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE company_license_term_item ADD edited TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE source_license_term_item ADD edited TINYINT(1) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE company_definitions DROP edited');
        $this->addSql('ALTER TABLE source_definitions DROP edited');
        $this->addSql('ALTER TABLE company_license_term_item DROP edited');
        $this->addSql('ALTER TABLE source_license_term_item DROP edited');
    }
}
