<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180205001012 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content ADD created_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE username username VARCHAR(180) NOT NULL, CHANGE username_canonical username_canonical VARCHAR(180) NOT NULL, CHANGE company_legal_name company_legal_name VARCHAR(255) NOT NULL, CHANGE company_website company_website VARCHAR(255) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP created_at');
        $this->addSql('ALTER TABLE `user` CHANGE username username VARCHAR(180) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE username_canonical username_canonical VARCHAR(180) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE company_legal_name company_legal_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE company_website company_website VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
    }
}
