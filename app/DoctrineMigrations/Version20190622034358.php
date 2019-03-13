<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190622034358 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE language (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(11) NOT NULL, name VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_D4DB71B577153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE translation (id INT AUTO_INCREMENT NOT NULL, language_id INT DEFAULT NULL, i18nKey VARCHAR(255) NOT NULL, value LONGTEXT DEFAULT NULL, INDEX IDX_B469456F82F1BAF4 (language_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE translation ADD CONSTRAINT FK_B469456F82F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE translation DROP FOREIGN KEY FK_B469456F82F1BAF4');
        $this->addSql('DROP TABLE language');
        $this->addSql('DROP TABLE translation');
    }
}
