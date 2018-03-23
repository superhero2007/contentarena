<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180323074239 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE bid_status (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE content_filter');
        $this->addSql('ALTER TABLE bid ADD status_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F36BF700BD FOREIGN KEY (status_id) REFERENCES bid_status (id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F36BF700BD ON bid (status_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F36BF700BD');
        $this->addSql('CREATE TABLE content_filter (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, userId INT NOT NULL, filterContent LONGTEXT NOT NULL COLLATE utf8_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE bid_status');
        $this->addSql('DROP INDEX IDX_4AF2B3F36BF700BD ON bid');
        $this->addSql('ALTER TABLE bid DROP status_id');
    }
}
