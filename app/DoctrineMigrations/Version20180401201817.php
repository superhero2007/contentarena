<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180401201817 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE season ADD tournament_id INT DEFAULT NULL, ADD start_date DATETIME DEFAULT NULL, ADD end_date DATETIME DEFAULT NULL, ADD year VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE season ADD CONSTRAINT FK_F0E45BA933D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('CREATE INDEX IDX_F0E45BA933D1A3E7 ON season (tournament_id)');
        $this->addSql('ALTER TABLE sport_category ADD country_code VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE tournament ADD sport_category_id INT DEFAULT NULL, ADD sport_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tournament ADD CONSTRAINT FK_BD5FB8D97173D9A4 FOREIGN KEY (sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('ALTER TABLE tournament ADD CONSTRAINT FK_BD5FB8D9AC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id)');
        $this->addSql('CREATE INDEX IDX_BD5FB8D97173D9A4 ON tournament (sport_category_id)');
        $this->addSql('CREATE INDEX IDX_BD5FB8D9AC78BCF8 ON tournament (sport_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE season DROP FOREIGN KEY FK_F0E45BA933D1A3E7');
        $this->addSql('DROP INDEX IDX_F0E45BA933D1A3E7 ON season');
        $this->addSql('ALTER TABLE season DROP tournament_id, DROP start_date, DROP end_date, DROP year');
        $this->addSql('ALTER TABLE sport_category DROP country_code');
        $this->addSql('ALTER TABLE tournament DROP FOREIGN KEY FK_BD5FB8D97173D9A4');
        $this->addSql('ALTER TABLE tournament DROP FOREIGN KEY FK_BD5FB8D9AC78BCF8');
        $this->addSql('DROP INDEX IDX_BD5FB8D97173D9A4 ON tournament');
        $this->addSql('DROP INDEX IDX_BD5FB8D9AC78BCF8 ON tournament');
        $this->addSql('ALTER TABLE tournament DROP sport_category_id, DROP sport_id');
    }
}
