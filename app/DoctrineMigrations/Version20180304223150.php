<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180304223150 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_sports (content_id INT NOT NULL, content_sport_id INT NOT NULL, INDEX IDX_1BFF89B084A0A3ED (content_id), INDEX IDX_1BFF89B0FECF5617 (content_sport_id), PRIMARY KEY(content_id, content_sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_sports ADD CONSTRAINT FK_1BFF89B084A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_sports ADD CONSTRAINT FK_1BFF89B0FECF5617 FOREIGN KEY (content_sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094FF92F3E70');
        $this->addSql('DROP INDEX fk_4fbf094ff92f3e70 ON company');
        $this->addSql('CREATE INDEX IDX_4FBF094FF92F3E70 ON company (country_id)');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094FF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_sports');
        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094FF92F3E70');
        $this->addSql('DROP INDEX idx_4fbf094ff92f3e70 ON company');
        $this->addSql('CREATE INDEX FK_4FBF094FF92F3E70 ON company (country_id)');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094FF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
    }
}
