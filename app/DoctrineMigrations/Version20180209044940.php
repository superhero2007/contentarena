<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180209044940 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_season (content_id INT NOT NULL, season_content_id INT NOT NULL, INDEX IDX_98D22B0584A0A3ED (content_id), INDEX IDX_98D22B05B49E6E4A (season_content_id), PRIMARY KEY(content_id, season_content_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_season ADD CONSTRAINT FK_98D22B0584A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_season ADD CONSTRAINT FK_98D22B05B49E6E4A FOREIGN KEY (season_content_id) REFERENCES season (id)');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A94EC001D1');
        $this->addSql('DROP INDEX IDX_FEC530A94EC001D1 ON content');
        $this->addSql('ALTER TABLE content DROP season_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_season');
        $this->addSql('ALTER TABLE content ADD season_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A94EC001D1 FOREIGN KEY (season_id) REFERENCES season (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A94EC001D1 ON content (season_id)');
    }
}
