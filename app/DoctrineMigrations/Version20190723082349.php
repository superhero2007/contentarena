<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190723082349 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE company ADD sport_id INT DEFAULT NULL, DROP federation');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094FAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id)');
        $this->addSql('CREATE INDEX IDX_4FBF094FAC78BCF8 ON company (sport_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094FAC78BCF8');
        $this->addSql('DROP INDEX IDX_4FBF094FAC78BCF8 ON company');
        $this->addSql('ALTER TABLE company ADD federation VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, DROP sport_id');
    }
}
