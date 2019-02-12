<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190113224907 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE source_license_term (id INT AUTO_INCREMENT NOT NULL, position INT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_F90A6E26462CE4F5 (position), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE source_license_term_item (id INT AUTO_INCREMENT NOT NULL, term_id INT DEFAULT NULL, position INT NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_1FAFD0B3E2C35FC (term_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE source_license_term_item ADD CONSTRAINT FK_1FAFD0B3E2C35FC FOREIGN KEY (term_id) REFERENCES source_license_term (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE source_license_term_item DROP FOREIGN KEY FK_1FAFD0B3E2C35FC');
        $this->addSql('DROP TABLE source_license_term');
        $this->addSql('DROP TABLE source_license_term_item');
    }
}
