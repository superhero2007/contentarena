<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190721235414 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE company_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company ADD category_id INT DEFAULT NULL, ADD region_id INT DEFAULT NULL, ADD federation VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094F12469DE2 FOREIGN KEY (category_id) REFERENCES company_category (id)');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094F98260155 FOREIGN KEY (region_id) REFERENCES region (id)');
        $this->addSql('CREATE INDEX IDX_4FBF094F12469DE2 ON company (category_id)');
        $this->addSql('CREATE INDEX IDX_4FBF094F98260155 ON company (region_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094F12469DE2');
        $this->addSql('DROP TABLE company_category');
        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094F98260155');
        $this->addSql('DROP INDEX IDX_4FBF094F12469DE2 ON company');
        $this->addSql('DROP INDEX IDX_4FBF094F98260155 ON company');
        $this->addSql('ALTER TABLE company DROP category_id, DROP region_id, DROP federation');
    }
}
