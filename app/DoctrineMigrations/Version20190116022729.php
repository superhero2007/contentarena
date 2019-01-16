<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190116022729 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE company_definitions (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, position INT NOT NULL, name VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, editable TINYINT(1) DEFAULT \'1\' NOT NULL, UNIQUE INDEX UNIQ_8ABF1D5A462CE4F5 (position), INDEX IDX_8ABF1D5A979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE source_definitions (id INT AUTO_INCREMENT NOT NULL, position INT NOT NULL, name VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, editable TINYINT(1) DEFAULT \'1\' NOT NULL, UNIQUE INDEX UNIQ_AF11F562462CE4F5 (position), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_definitions ADD CONSTRAINT FK_8ABF1D5A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE company_definitions');
        $this->addSql('DROP TABLE source_definitions');
    }
}
