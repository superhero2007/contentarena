<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190115230848 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE company_license_term_item (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, term_id INT DEFAULT NULL, position INT NOT NULL, content LONGTEXT NOT NULL, editable TINYINT(1) DEFAULT \'1\' NOT NULL, INDEX IDX_7C103350979B1AD6 (company_id), INDEX IDX_7C103350E2C35FC (term_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_license_term_item ADD CONSTRAINT FK_7C103350979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE company_license_term_item ADD CONSTRAINT FK_7C103350E2C35FC FOREIGN KEY (term_id) REFERENCES source_license_term (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE company_license_term_item');
    }
}
