<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171218031416 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F92F3E70');
        $this->addSql('DROP INDEX IDX_8D93D649F92F3E70 ON user');
        $this->addSql('ALTER TABLE user ADD country VARCHAR(25) NOT NULL, DROP country_id, CHANGE password password VARCHAR(255) NOT NULL, CHANGE first_name first_name VARCHAR(255) NOT NULL, CHANGE last_name last_name VARCHAR(255) NOT NULL, CHANGE company_legal_name company_legal_name VARCHAR(255) NOT NULL, CHANGE company_website company_website VARCHAR(255) NOT NULL, CHANGE title title VARCHAR(255) NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `user` ADD country_id INT DEFAULT NULL, DROP country, CHANGE password password VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE first_name first_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE last_name last_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE company_legal_name company_legal_name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE company_website company_website VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, CHANGE title title VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D649F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649F92F3E70 ON `user` (country_id)');
    }
}
