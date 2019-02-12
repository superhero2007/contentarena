<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180128224231 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content ADD tournament_id INT DEFAULT NULL, ADD season_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A933D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A94EC001D1 FOREIGN KEY (season_id) REFERENCES season (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A933D1A3E7 ON content (tournament_id)');
        $this->addSql('CREATE INDEX IDX_FEC530A94EC001D1 ON content (season_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A933D1A3E7');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A94EC001D1');
        $this->addSql('DROP INDEX IDX_FEC530A933D1A3E7 ON content');
        $this->addSql('DROP INDEX IDX_FEC530A94EC001D1 ON content');
        $this->addSql('ALTER TABLE content DROP tournament_id, DROP season_id');
    }
}
