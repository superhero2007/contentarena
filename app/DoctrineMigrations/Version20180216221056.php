<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180216221056 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sport_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, externalId VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_30EEE67BA770AC6E (externalId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content ADD sport_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A97173D9A4 FOREIGN KEY (sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A97173D9A4 ON content (sport_category_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A97173D9A4');
        $this->addSql('DROP TABLE sport_category');
        $this->addSql('DROP INDEX IDX_FEC530A97173D9A4 ON content');
        $this->addSql('ALTER TABLE content DROP sport_category_id');
    }
}
