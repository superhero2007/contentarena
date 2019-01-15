<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190114203954 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sports_group_sports (sports_group_id INT NOT NULL, sport_id INT NOT NULL, INDEX IDX_CA17A4AFAE778714 (sports_group_id), UNIQUE INDEX UNIQ_CA17A4AFAC78BCF8 (sport_id), PRIMARY KEY(sports_group_id, sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sports_group_sports ADD CONSTRAINT FK_CA17A4AFAE778714 FOREIGN KEY (sports_group_id) REFERENCES sports_group (id)');
        $this->addSql('ALTER TABLE sports_group_sports ADD CONSTRAINT FK_CA17A4AFAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE sports_group_sports');
    }
}
